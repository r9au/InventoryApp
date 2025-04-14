const mong=require('mongoose');
const UserSchema= new mong.Schema(
   { 
    Name:String,
    Email:String,
    Contact:String,
    Passkey:String,
    Gst:String,
    Address:String,
    Btype:String
    },
    {
        collection:'User'
    }

)
module.exports=mong.model('User',UserSchema,'User');