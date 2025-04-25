const mong=require('mongoose');
const UserSchema= new mong.Schema(
   { 
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Passkey:{type:String,required:true},
    },
    {
        collection:'User'
    }

)
module.exports=mong.model('User',UserSchema,'User');