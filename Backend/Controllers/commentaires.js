import Commentaire from "../Models/Commentaire.js";
import Formation from "../Models/formation.js";
import Reponse from "../Models/Reponse.js";


  export const createCommentaire = async (req, res) => {
    const { commentaire,formationID } = req.body;
    const cmnt = new Commentaire({
        commentaire:commentaire,
        formationID:formationID,
        userID:req.user.user[0]._id
    });
    console.log("this commentaire",cmnt)
    
    try {
      await cmnt.save();
      const commentaire= await Commentaire.findOne().sort({  _id: -1 }).limit(1);
      await Formation.findByIdAndUpdate(formationID  ,
        { $push: { commentaires: commentaire._id } },
        { new: true, useFindAndModify: false });
      res.status(200).json(commentaire);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };
  export const getCommentaireByFormation= async (req, res) => {
    try {
      const commentaires = await Commentaire.find({ "formationID": req.params.id }).populate("userID").populate({
        path : 'reponses',
        populate : {
          path : 'userID'
        }
      }).exec();
      res.status(200).json(commentaires);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const addReponse = async (req, res) => {
  
    console.log(req.body);
    const reponse = new Reponse({
      
      reponse:req.body.reponse,
      userID:req.user.user[0]._id
  });
  

    try {
      await reponse.save();
      const rep= await Reponse.findOne().sort({  _id: -1 }).limit(1);
      await Commentaire.findByIdAndUpdate(req.body.commentaireID  ,
        { $push: { reponses: rep._id } },
        { new: true, useFindAndModify: false });
        
      res.status(200).json(rep);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };


  