const exp = require('express');
const mong = require('mongoose');
const app = exp();
const bodyParser = require("body-parser")
const cors = require("cors")
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
const { useParams } = require('react-router-dom');
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
    const { Name, Email, Contact, Passkey, Gst, Address, Btype } = req.body;
    try {
        const user = new User({
            Name,
            Email,
            Contact,
            Passkey,
            Gst,
            Address,
            Btype
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
        const token = jwt.sign({ User_id: rec._id.toString(), mail: rec.Email }, "secret_key", { expiresIn: "1h" })
        res.status(200).json({ Success: true, token: token, user_id: rec._id })
    }
    else {
        res.status(400).json({ Success: false, err: "Invalid credentials" })
    }
})

app.get("/workspace/:userid", async (req, res) => {
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
        const upcrd=workspace.Cards.filter(card=>new Date(card.Exp)-Date.now()>0)
        workspace.Cards=upcrd
        workspace.Cards.sort((cardA, cardB) => { return new Date(cardA.Exp) - new Date(cardB.Exp) })
        return res.status(200).json(workspace)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "System error" })
    }
})
app.post("/workspace/:userid/addcard", upload.single("snap"), async (req, res) => {
    try {
        const { userid } = req.params;
        const objid = new mong.Types.ObjectId(userid)
        const Name = req.body.Name;
        const Amount = req.body.Amount;
        const Exp = req.body.Exp;
        const Price=req.body.Price
        const Timestmp = req.body.Timestmp || new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit" });
        let workspace = await Workspace.findOne({ Userid: objid })
        if (!workspace) {
            workspace = new Workspace({ Userid: objid, Cards: [] })
        }
        const snap_path = req.file ? req.file.filename : "deficon.jpg"
        workspace.Cards.push({ Name, Amount, Exp, Price, Timestmp, snap: snap_path })
        await workspace.save();
        return res.status(200).json({ Userid: userid, wrk: workspace })
    }
    catch (err) {
        return res.status(400).json({ error: "Some error occured" })
    }
})
app.post("/Workspace/:userid/delcard", async (req, res) => {
    const { userid } = req.params
    const objid = new mong.Types.ObjectId(userid)
    const { Name } = req.body;
    let workspace = await Workspace.findOne({ Userid: objid })
    if (!workspace) {
        return res.status(400).json({ err: "User error in accessing workspace" })
    }
    const imgcrd=workspace.Cards.filter(card=>card.Name==Name)
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
    const updatedcrd = workspace.Cards.filter(card => card.Name !== Name)
    if (workspace.Cards.length === updatedcrd.length) {
        return res.status(500).json({ err: "Item not found" })
    }
    workspace.Cards = updatedcrd;
    await workspace.save();
    return res.status(200).json({ success: "Card deleted successfully, refresh the page" })
})
app.listen(port, (req, res) => {
    console.log(`app listening on ${port}`)
})