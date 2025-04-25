const mong=require('mongoose')
const {v4:uuidv4}=require('uuid')
const WorkspaceSchema=new mong.Schema(
    {
        Userid:{type:mong.Schema.Types.ObjectId,required:true,ref:"User"},
        PCards:[{
            Name:{type:String},
            Amount:{type:String,required:true},
            Itemtype:{type:String},
            Exp:{type:String,default:null},
            Price:{type:String},
            Timestmp:{type:String},
            snap:{type:String,required:false},
            Itemid:{type:String,default:uuidv4()}
        }],
        NPCards:[{
            Name:{type:String},
            Amount:{type:String,required:true},
            Itemtype:{type:String},
            Price:{type:String},
            Timestmp:{type:String},
            snap:{type:String,required:false},
            Itemid:{type:String,default:uuidv4()}
        }]
    },
    {
        collection:'Workspace'
    }
)
const Workspace=mong.model("Workspace",WorkspaceSchema,'Workspace');
module.exports=Workspace;