const mong=require('mongoose')
const WorkspaceSchema=new mong.Schema(
    {
        Userid:{type:mong.Schema.Types.ObjectId,required:true,ref:"User"},
        Cards:[{Name:String,Amount:Number,Exp:String,Price:Number,Timestmp:String,snap:String}]
    },
    {
        collection:'Workspace'
    }
)
const Workspace=mong.model("Workspace",WorkspaceSchema,'Workspace');
module.exports=Workspace;