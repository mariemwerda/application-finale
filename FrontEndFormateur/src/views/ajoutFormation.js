import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "../Axios/Api";
import { toast } from 'react-toastify';
import { addformation } from "../Redux/Actions/formationsActions.js"
import { useDispatch } from "react-redux"
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { CategorieService } from '../Services/Categorie-service'
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from "@mui/material";


const AjoutFormation = () => {
    const [titre, setTitre] = useState("");
    const [resume, setResume] = useState("");
    const [description, setDesctiption] = useState("");
    const [categorieID, setCatID] = useState("");
    const [categories, setCategories] = useState([]);
    // const [categorie,setCategorie]=useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        CategorieService.fetchCategorie().then((res) => {
            setCategories(res.data);
            console.log(res.data)
        });
    }, []);

    const handleSubmit = (event) => {
        /* const formation={
             titre: titre,
             Resume: resume,
             docformation: docformation,
             description: description
         };
         console.log(formation);
       */
        const data = {
            titre: titre,
            Resume: resume,
            description: description,
            categorieID: categorieID,
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
                            onChange={e => setTitre(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name="resume"
                            label="Resume"
                            type="text"
                            onChange={e => setResume(e.target.value)}
                        />
                    </Grid>

                    <Grid item>
                        <br></br>
                        description
                        <br></br>
                        <TextareaAutosize
                            onChange={e => setDesctiption(e.target.value)}
                            style={{ width: 400 }}

                        />
                        <br></br>
                        <FormControl style={{ width: 350 }}>
                            <TextField
                                select
                                label="Catégories"
                                variant="outlined"
                                value={categorieID}
                                style={{ width: "340", marginLeft: 8 }}
                                onChange={(event) => {
                                    setCatID(event.target.value);
                                                          }}
                                helperText="Sélectionner une catégorie"
                            >
                                {
                                    categories ?
                                        categories.map(cat =>
                                            
                                            <MenuItem key={cat._id}
                                                value={cat._id}>{cat.nomcategorie}
                                            </MenuItem>
                                           
                                        )
                                        : null
                                }
                            </TextField>
                        </FormControl>




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