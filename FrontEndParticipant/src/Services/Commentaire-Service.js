import Axios from "../Axios/Api";
const COMMENTAIRE_API = '/commentaires';
const token = localStorage.getItem("CC_Token");
 const AddCommentaireToFormation=async(commentaire)=>{
    return await Axios.post(COMMENTAIRE_API+"/efzfezf",commentaire ,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
   
    const GetCommentaires=async(id)=>{
        return await Axios.get(COMMENTAIRE_API+"/"+id,
        {
          headers: { Authorization: `Bearer ${token}` },
        });
       
  
  }
  const AddReponse=async(rep)=>{
    return await Axios.post(COMMENTAIRE_API+"/addReponse/zeo",rep,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
}
   export const CommentaireService = {
    AddCommentaireToFormation,
    GetCommentaires,
    AddReponse
    }
    