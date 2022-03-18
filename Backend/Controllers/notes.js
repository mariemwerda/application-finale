import Formation from "../Models/formation.js";
import Note from "../Models/note.js";
export const addNote = async (req, res) => {
    const { note,formationID } = req.body;
    console.log(req.body)
    const n = new Note({
        note:note,
        formationID:formationID,
        userID:req.user.user[0]._id
    });
    
    try {
      await n.save();
      const mynote= await Note.findOne().sort({  _id: -1 }).limit(1);
      await Formation.findByIdAndUpdate(formationID  ,
        { $push: { notes: mynote._id } },
        { new: true, useFindAndModify: false });
      res.status(200).json(mynote);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };


  export const getNoteByFormationUser = async (req, res) => {
    const id = req.params.id;
   console.log("this "+id)
   
    
    try {
        const note=Note.findOne({"userID":req.user.user[0]._id, "formationID":id})
        res.send(note);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };


  export const getNoteGlobal = async (req, res) => {
        const id=req.params.id;   
    try {
        const notes=Note.find({"formationID":id})
        var note=0;
        var i=0;
        for (i=0;i<notes.length;i++)
        {
            note=note+notes[i].note
        }
        note=note/notes.length;
        res.send(note)
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };