import React, { useState, useEffect } from "react";

import { FileService } from "../Services/File-services.js";
import Checkbox from '@mui/material/Checkbox';



function ChangerAffichage(props) {
    
    const id =props.id

    const [checked, setChecked] = React.useState(true)
    const [description, setDesctiption] = React.useState("")
    const [docfile, setDocfile] = React.useState("")

    const handleChange = (event) => {
       setChecked(event.target.checked);
       const data ={id:id,
        isSelected:event.target.checked,
        docfile:docfile,
        description:description
    }
       FileService.EditFile(data)
       props.changeEtat();

      };
  useEffect(() => {
    FileService.GetFileById(id)
    .then(res => {
        setDocfile(res.data[0].docformation)
            setDesctiption(res.data[0].description)
           setChecked(res.data[0].isSelected)
    }).catch((error) => console.log(error));
    


  }, []);

  return (
    <Checkbox
    checked={checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'controlled' }}
  />   
     

  );
}

export default ChangerAffichage;
