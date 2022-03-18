import DocFormation from "../Models/docformation.js";
import Formation from "../Models/formation.js";

import fs from "fs";
export const createDocFormation = async (req, res,next) => {
    console.log(req);

    let oldFile= './uploads/'+req.file.filename;
     let newFile= './uploads/'+req.file.originalname
  
     fs.rename(
      oldFile,
      newFile,
        (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  });
  
  const id= req.body.id;
  console.log(id)
      const newdocformation = new DocFormation(
          {
             
              docformation: req.file.originalname,
              description: req.body.description,
              isSelected:req.body.isSelected
              
  
          })
      try {
          await newdocformation.save()
          const mydocformation= await DocFormation.findOne().sort({  _id: -1 }).limit(1);


          await Formation.findByIdAndUpdate(id  ,
            { $push: { docformations: mydocformation._id } },
            { new: true, useFindAndModify: false });
          res.status(200).json(newdocformation)
      }
      catch (error) {
          res.status(404).json({ message: error.message })
      }
      
    
     
  

  }
 export const getFileByformation=async (req, res)=>{
        const format = await Formation.findById(req.params.id)
        const listedocformation=format.docformations;
        var files = new Array();
        var i=0;
        console.log(listedocformation)
        if(listedocformation.length!=0){

        for(i=0;i<listedocformation.length;i++){
           
            const docFormation =await DocFormation.findById(listedocformation[i]);
           
                const file = docFormation;
                files.push(file)                  
 
     }
      
        }
        res.status(200).json(files);

   
 }
 export const downloadFile = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };
  export const updateFile = async (req, res) => {
    
   try {
       const file = {
            isSelected:req.body.isSelected,
           

        }
        console.log(file)
        await DocFormation.findByIdAndUpdate(req.body.id, file)
        res.status("200").json(file)
    }
    catch (error) {
        res.status(405).json({ message: error.message })
    }
    
}

  export const getFileById=async(req,res)=>{
    const id = req.params.id;
    try {
        var result = await DocFormation.find({ _id: id })
            console.log("result", result)
        res.json(result)
    }
    catch (error) { res.json({ message: error.message }) }
  }


  export const getFileFiltred=async (req, res)=>{
   
    const format = await Formation.findById(req.params.id)
    const listedocformation=format.docformations;
    var files = new Array();
    var i=0;
    console.log(listedocformation)
    if(listedocformation.length!=0){

    for(i=0;i<listedocformation.length;i++){
       
        const docFormation =await DocFormation.findById(listedocformation[i]);
       
            const file = docFormation;
          if(file.isSelected==true)
            files.push(file)       


 }
  
    }
    res.status(200).json(files);


}