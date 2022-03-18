import mongoose from "mongoose";
const docFormationSchema=mongoose.Schema({
    description:{type:String,required:true},
    docformation:{type:String,required:true},
    date : { type : Date, default: Date.now },
    isSelected:{type: Boolean, default: false}
  

})
const DocFormation = mongoose.model('DocFormation',docFormationSchema);
export default DocFormation