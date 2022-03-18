import React, { useState , useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {modifierFormation, loadSingleformation} from "../Redux/Actions/formationsActions.js"
import {useDispatch , useSelector} from "react-redux"
import {useParams,useHistory} from "react-router-dom"



const ModifierFormation = () => {
    const [titre,setTitre]=useState("");
    const [resume, setResume]=useState("");
    const [description, setDesctiption]=useState("");
  //  const [categorie,setCategorie]=useState("");
  const params = useParams();
  const id=params.id;
  const dispatch = useDispatch();
  const history =useHistory()
   
  useEffect(() => {
      
  dispatch(loadSingleformation(id))
      console.log("hello")
     console.log(id)     
  }, [id,dispatch]);

  const formation= useSelector((state) =>state.allformations.formation)
  useEffect(() => {
    console.log("hello2")

    setTitre(formation.titre)
    setDesctiption(formation.description)
    setResume(formation.Resume)
     
  }, [formation]);

    const handleSubmit = (event) => {
      
     const data ={
       _id:id,
       titre:titre,
       Resume:resume,
       description:description
     }
    dispatch(modifierFormation(data)); 
    history.push("../formation")  
  };
    return (
        <>
        <br></br>
        <br></br>
        <br></br>
            <h3> Modifier formation</h3>
            <form >
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            value={titre}
                            name="titre"
                            label="titre formation"
                            type="text"
                            onChange={e=>{setTitre(e.target.value); 
                            console.log(titre);}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={resume}
                            name="resume"
                            label="Resume"
                            type="text"

                            onChange={e=>setResume(e.target.value)}
                        />
                    </Grid>
                    
                    <Grid item>
                        <TextField
                            value={description}
                            name="description"
                            label="Description"
                            type="text"
                            onChange={e=>setDesctiption(e.target.value)}
                        />
                    </Grid>
                   <br></br>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Modifier
                    </Button>
                </Grid>
            </form>
        </>
    );
};
export default ModifierFormation;