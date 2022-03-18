import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "../Axios/Api";
import {  toast } from 'react-toastify';
import {addformation} from "../Redux/Actions/formationsActions.js"
import {useDispatch} from "react-redux"



const AjoutFormation = () => {
    const [titre,setTitre]=useState("");
    const [resume, setResume]=useState("");
    const [description, setDesctiption]=useState("");
  //  const [categorie,setCategorie]=useState("");
  const dispatch = useDispatch();
   
  
    const handleSubmit = (event) => {
       /* const formation={
            titre: titre,
            Resume: resume,
            docformation: docformation,
            description: description
        };
        console.log(formation);
      */
     const data ={
       titre:titre,
       Resume:resume,
       description:description
     };
    
     dispatch(addformation(data)); 
        
      

    };
    return (
        <>
            <h3> Ajouter formation</h3>
            <form >
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField

                            name="titre"
                            label="titre formation"
                            type="text"
                            onChange={e=>setTitre(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField

                            name="resume"
                            label="Resume"
                            type="text"

                            onChange={e=>setResume(e.target.value)}
                        />
                    </Grid>
                    
                    <Grid item>
                        <TextField

                            name="description"
                            label="Description"
                            type="text"
                            onChange={e=>setDesctiption(e.target.value)}
                        />
                    </Grid>
                   <br></br>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
        </>
    );
};
export default AjoutFormation;