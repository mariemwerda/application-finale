import mongoose from "mongoose"
const noteSchema = mongoose.Schema({
    note: { type: Number },
    userID: { type:mongoose.Schema.Types.ObjectId, ref: "User" },
    formationID: { type:mongoose.Schema.Types.ObjectId, ref: "Formation" },
})
const Note = mongoose.model('Note', noteSchema);
export default Note