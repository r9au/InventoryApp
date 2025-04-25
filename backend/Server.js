const exp = require('express');
const mong = require('mongoose');
const app = exp();
const bodyParser = require("body-parser")
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
app.use(cors())
const port = process.env.PORT || 8000;
app.use(exp.json())
app.use(exp.urlencoded({ extended: true }))
app.use('/uploads', exp.static(path.join(__dirname, '/uploads')))
app.use('/public', exp.static(path.join(__dirname, '/public')))
const User = require("./models/User")
const Workspace = require("./models/workspace");
try{
    mong.connect(`${process.env.MongoUri}`);
    console.log("connected")
}
catch(err){
    console.log("Error"+err)
}

//////////////////////////////////////////////////multer upload image
const upl = path.join(__dirname, './uploads')
if (!fs.existsSync(upl)) {
    fs.mkdirSync(upl)
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, upl)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

///////////////////////////////////////////////user Api

app.post('/datasub', async (req, res) => {
    const { Name,Email,Passkey} = req.body;
    try {
        const user = new User({
            Name,
            Email,
            Passkey,
        })
        await user.save()
        res.status(200).json({ Success: "User registered" })
        // console.log(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: "Some error occured" })
    }
})
app.post('/Auth', async (req, res) => {
    const { Email, Passkey } = req.body
    const rec = await User.findOne({ Email: Email })
    if (rec && rec.Passkey === Passkey) {
        const token = jwt.sign({ User_id: rec._id.toString(), mail: rec.Email }, process.env.Secret_key, { expiresIn: "1h" })
        res.status(200).json({ Success: true, token: token, user_id: rec._id })
    }
    else {
        res.status(400).json({ Success: false, err: "Invalid credentials" })
    }
})

app.get("/workspace/:token/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        if (!mong.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ error: "Internal server error" })
        }
        const objid = new mong.Types.ObjectId(userid)
        let workspace = await Workspace.findOne({ Userid: objid })
        if (!workspace) {
            return res.status(200).json({ userid: userid, cards: "No item added in inventory" })
        }
        if(workspace.PCards.length>1){
        const upcrd=workspace.PCards.filter(card=>new Date(card.Exp)-Date.now()>0)
        workspace.PCards=upcrd
        workspace.PCards.sort((cardA,cardB) => { return new Date(cardA.Exp) - new Date(cardB.Exp)})
        }
        if(workspace.NPCards.length>1){
            const upcrd=workspace.NPCards.filter(card=>card.Amount>0)
            workspace.NPCards=upcrd
            workspace.NPCards.sort((cardA,cardB)=>{return cardA.Amount-cardB.Amount})
        }
        return res.status(200).json(workspace)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "System error" })
    }
})
app.post("/workspace/:token/:userid/addcard", upload.single("snap"), async (req, res) => {
    try {
        const { userid } = req.params;
        const objid = new mong.Types.ObjectId(userid)
        const data=req.body
        const Timestmp = req.body.Timestmp || new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit" });
        let workspace = await Workspace.findOne({ Userid: objid })
        if (!workspace) {
            workspace = new Workspace({ Userid: objid, Cards: [] })
        }
        if(data.Itemtype==='Perishables'){
            const Name = req.body.Name;
            const Amount = req.body.Amount;
            const Itemtype=req.body.Itemtype
            const Exp = req.body.Exp;
            const Price=req.body.Price
            const snap_path = req.file ? req.file.filename : "deficon.jpg"
            const Itemid=req.body.Itemid
        workspace.PCards.push({ Name, Amount, Itemtype, Exp, Price, Timestmp, snap: snap_path,Itemid:Itemid})
        await workspace.save();
        }
        else{
            const Name = req.body.Name;
            const Amount = req.body.Amount;
            const Itemtype=req.body.Itemtype;
            const Price=req.body.Price;
            const snap_path = req.file ? req.file.filename : "deficon.jpg"
            const Itemid=req.body.Itemid;
            workspace.NPCards.push({ Name, Amount, Itemtype, Price, Timestmp, snap: snap_path,Itemid:Itemid})
            await workspace.save();
        }
        return res.status(200).json({ Userid: userid, wrk: workspace })
    }
    catch (err) {
        return res.status(400).json({ error: "Some error occured" })
    }
})
app.post("/Workspace/:token/:userid/delcard", async (req, res) => {
    const { userid } = req.params
    const objid = new mong.Types.ObjectId(userid)
    const { Itemid,Itemtype } = req.body;
    let workspace = await Workspace.findOne({ Userid: objid })
    if (!workspace) {
        return res.status(400).json({ err: "User error in accessing workspace" })
    }
    if(Itemtype==='Perishables'){
        const imgcrd=workspace.PCards.filter(card=>card.Itemid==Itemid)
        imgcrd.forEach((card)=>{
            const img=path.join(__dirname,"uploads",card.snap)
            if(fs.existsSync(img)){
                try{
                    fs.unlinkSync(img)
                    console.log("deleted")
                }
                catch(err){
                    console.log("Error:"+err)
                }
            }
        })
        const updatedcrd = workspace.PCards.filter(card => card.Itemid !== Itemid)
        if (workspace.PCards.length === updatedcrd.length) {
            return res.status(500).json({ err: "Item not found" })
        }
        workspace.PCards = updatedcrd;
        await workspace.save();
    }else{
        const imgcrd=workspace.NPCards.filter(card=>card.Itemid==Itemid)
        imgcrd.forEach((card)=>{
            const img=path.join(__dirname,"uploads",card.snap)
            if(fs.existsSync(img)){
                try{
                    fs.unlinkSync(img)
                    console.log("deleted")
                }
                catch(err){
                    console.log("Error:"+err)
                }
            }
        })
        const updatedcrd = workspace.NPCards.filter(card => card.Itemid !== Itemid)
        if (workspace.NPCards.length === updatedcrd.length) {
            return res.status(500).json({ err: "Item not found" })
        }
        workspace.NPCards = updatedcrd;
        await workspace.save();
    }
    return res.status(200).json({ success: "Card deleted successfully, refresh the page" })
})
app.post('/Workspace/:token/:userid/updatecard',async(req,res)=>{
    const { userid } = req.params
    const objid = new mong.Types.ObjectId(userid)
    let workspace = await Workspace.findOne({ Userid: objid })
    const {Amount,Itemid,Itemtype}=req.body
    if(Itemtype==='Perishables'){
        const crd=workspace.PCards.find(card=>card.Itemid===Itemid)
        if(!crd){
            return res.status(400).json({err:"Unable to find card"})
        }
        crd.Amount=Amount
        await workspace.save()
        const ncrd=workspace.PCards.find(card=>card.Itemid===Itemid)
        if(ncrd.Amount!=Amount){
            return res.status(500).json({err:"Unable to update card"})
        }
        res.status(200).json({success:"Card updated succcessfully"})
    }else{
        const crd=workspace.NPCards.find(card=>card.Itemid===Itemid)
        if(!crd){
            return res.status(400).json({err:"Unable to find card"})
        }
        crd.Amount=Amount
        await workspace.save()
        const ncrd=workspace.NPCards.find(card=>card.Itemid===Itemid)
        if(ncrd.Amount!=Amount){
            return res.status(500).json({err:"Unable to update card"})
        }
        res.status(200).json({success:"Card updated succcessfully"})
    }
})
app.listen(port, (req, res) => {
    console.log(`app listening on ${port}`)
})
