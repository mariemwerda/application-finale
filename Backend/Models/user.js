import mongoose from "mongoose"
var userSchema = mongoose.Schema({
    nom: {
        type: String,
        required: "nom is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "password is required"
    },

    role: {
        type: String,
        default: 'participant',
        enum: ["formatteur", "participant","admin"]
       },
    accessToken: {
        type: String
       },
    formations:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Formation"
    }]

});
const User = mongoose.model('User', userSchema)
export default User
