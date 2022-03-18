import Axios from "../Axios/Api";
const FILE_API = '/docformations';
const token = localStorage.getItem("CC_Token");
const GetFileByFormation=async(id)=> {
    
return await Axios.get(FILE_API+'/fileFormation/'+id,{
    headers: { Authorization: `Bearer ${token}` },
  },);
}
const GetFileById=async(id)=> {
return await Axios.get(FILE_API + '/' + id,{
    headers: { Authorization: `Bearer ${token}` },
  },);
}
const DeleteFile=async(Id)=> {
return await Axios.delete(FILE_API + '/' + Id,{
    headers: { Authorization: `Bearer ${token}` },
  },)
}
const AddFile=async(file)=> {
return await Axios.post(FILE_API+"/", file,{
    headers: { Authorization: `Bearer ${token}` },
  },);
  
}
const downloadFile=async(file)=> {
    return await Axios.get(FILE_API+"/download/"+ file,{
        headers: { Authorization: `Bearer ${token}` },
      },);
      
    }
const EditFile=async(selection)=> {
return await Axios.put(FILE_API + '/'+selection.id , selection,
{
    headers: { Authorization: `Bearer ${token}` },
    

  });
}
export const FileService = {
    GetFileByFormation,
GetFileById,
DeleteFile,
AddFile,
EditFile,
downloadFile
}
