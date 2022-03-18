import Categorie from "../Models/categorie.js";

export const getCategories = async (req, res) => {
    try {
      const cat = await Categorie.find();
      res.status(200).json(cat);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  export const createCategorie = async (req, res) => {
    const { nomcategorie } = req.body;
    const newCategorie = new Categorie({
      nomcategorie: nomcategorie,
      
    });
    try {
      await newCategorie.save();
      res.status(200).json(newCategorie);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  export const getCategorieByID = async (req, res) => {
    try {
      const cat = await Categorie.findById(req.params);
      res.status(200).json(cat);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  export const deleteCategorie = async (req, res) => {
    const { nomcategorie} = req.body;
    const { id } = req.params;
  
    var categorie = await Categorie.findById(req.params).exec();
    if (categorie == null) return res.status(404).json("categorie not found");
  
    try {
      await Categorie.findByIdAndDelete(req.params);
      res.status(200).json({ message: "categorie deleted successfully" });
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
  export const updateCategorie = async (req, res) => {
    const { nomcategorie} = req.body;
    console.log(req.body);
  
    try {
      const cat1 = req.body;
      await Categorie.findByIdAndUpdate(req.params, cat1);
      res.json(cat1);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
