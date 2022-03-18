import Axios from "../Axios/Api";
const ARTICLE_API = "/categories";
const fetchCategorie = async () => {
  return await Axios.get(ARTICLE_API);
};
const setFormByCat = async (id) => {
  return await Axios.get("/formations/affparcat/"+id);
};
export const CategorieService = {
  fetchCategorie,
  setFormByCat,
  
};
