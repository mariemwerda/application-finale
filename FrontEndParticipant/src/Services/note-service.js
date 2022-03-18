import Axios from "../Axios/Api";
const NOTE_API = '/notes';
const token = localStorage.getItem("CC_Token");

const getNoteGlobal=async(id)=>{
    return await Axios.get(NOTE_API+'/global/'+id,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}
const getNoteByFormationUser=async(id)=>{

    return await Axios.get(NOTE_API+'/'+id,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}
const addNote=async(rep)=>{
    console.log(rep)
    return await Axios.post(NOTE_API+"/addReponse/",rep,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}
export const NoteService = {
    addNote,
    getNoteByFormationUser,
    getNoteGlobal,
}