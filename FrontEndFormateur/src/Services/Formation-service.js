import Axios from "../Axios/Api";
const FORMATION_API = '/formations';
const token = localStorage.getItem("CC_Token");
const GetFormationByFormateur=async()=> {
    
return await Axios.get(FORMATION_API+'/formationUser/khdvcshk',{
    headers: { Authorization: `Bearer ${token}` },
  },);
}
const GetFormationById=async(formationId)=> {
return await Axios.get(FORMATION_API + '/' + formationId,{
    headers: { Authorization: `Bearer ${token}` },
  },);
}
const DeleteFormation=async(formationId)=> {
return await Axios.delete(FORMATION_API + '/' + formationId,{
    headers: { Authorization: `Bearer ${token}` },
  },)
}
const AddFormation=async(formation)=> {
return await Axios.post(FORMATION_API+"/", formation,{
    headers: { Authorization: `Bearer ${token}` },
  },);
  
}
const EditFormation=async(formation)=> {
return await Axios.put(FORMATION_API + '/' +formation._id, formation,
{
    headers: { Authorization: `Bearer ${token}` },
  });
}

const GetParticipantByFormation=async(id)=> {
  return await Axios.get(FORMATION_API + '/participant/' +id, 
  {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  const GetFormations =async()=>{
    return await Axios.get(FORMATION_API + '/', 
  {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  }
  const checkInscription=async(id)=>{
    return await Axios.get(FORMATION_API+"/checkInsription/"+id ,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  }
      
  export const AddUserToFormation=async(id)=>{
    return await Axios.post(FORMATION_API+"/inscrire/"+id,id ,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
   
  
  }
  const GetFormationInscrites=async()=> {
    return await Axios.get(FORMATION_API + '/formationUser/fujje' , 
    {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    const GetFormateur = async(id)=>{
      return await Axios.get(FORMATION_API + '/getFormateur/'+id , 
    {
        headers: { Authorization: `Bearer ${token}` },
      });
    
    }
export const FormationService = {
checkInscription,
GetFormationByFormateur,
GetFormationById,
DeleteFormation,
AddFormation,
EditFormation,
GetParticipantByFormation,
GetFormations,
AddUserToFormation,
GetFormationInscrites,
GetFormateur
}
