import mongoose from "mongoose";
const formationSchema=mongoose.Schema({
    titre:{type:String,required:true},
    Resume:{type:String,required:true},
    docformations  :[{type:mongoose.Schema.Types.ObjectId,ref:"DocFormation"}],
    description:{type:String,required:true},
    categorieID: { type:mongoose.Schema.Types.ObjectId, ref: "Categorie" },
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    commentaires:[{type:mongoose.Schema.Types.ObjectId,ref:"Commentaire"}],
    notes:[{type:mongoose.Schema.Types.ObjectId,ref:"Note"}],
    

})  
const Formation = mongoose.model('Formation',formationSchema);
export default Formation