import mongoose from "mongoose"
const cathegorieSchema = mongoose.Schema({
    nomcategorie: { type: String, required: true, unique: true }

})
const Categorie = mongoose.model('Categorie', cathegorieSchema);
export default Categorie