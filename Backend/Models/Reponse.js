import mongoose from "mongoose"
const reponseSchema = mongoose.Schema({
    reponse: { type: String},
    userID: { type:mongoose.Schema.Types.ObjectId, ref: "User" },

})
const Reponse = mongoose.model('Reponse', reponseSchema);
export default Reponse