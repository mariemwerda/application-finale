import mongoose from "mongoose";
const commentaireSchema=mongoose.Schema({
    reponses:[{type:mongoose.Schema.Types.ObjectId,ref:"Reponse"}],
    commentaire:{type:String},
    userID: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
    formationID: { type:mongoose.Schema.Types.ObjectId, ref: "Formation" },
})
const Commentaire = mongoose.model('Commentaire',commentaireSchema);
export default Commentaire