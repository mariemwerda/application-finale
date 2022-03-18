import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "../Axios/Api";
import { toast } from 'react-toastify';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from "react-router-dom"
const AjoutDocument = () => {
    const [file, setFile] = useState({});
    const [value, setValue] = React.useState("non")
    const [checked, setChecked] = React.useState(false)
    const [description, setDesctiption] = useState("");
    //  const [categorie,setCategorie]=useState("");

    const { id } = useParams();

    const handleChange = (event) => {
        setValue(event.target.value);
if (event.target.value=="oui")  
    setChecked(true)
    else
    setChecked(false)



};


    const handleSubmit = (event) => {

        const data = new FormData()
        data.append("description", description);
        data.append("file", file);
        data.append("id", id);
        data.append("isSelected", checked)
        console.log(data)
        Axios.post("/docformations", data).then((res) => {
            toast("Formation ajouté", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        });
        event.preventDefault()


    };
    return (
        <div style={{ marginTop: "80px", padding: "20px" }}>
            <h3> Ajouter document</h3>
            <form >
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <TextField
                            name="description"
                            label="Description"
                            type="text"
                            onChange={e => setDesctiption(e.target.value)}
                        />
                    </Grid>



                    <Grid item>

                        <TextField

                            name="file"
                            label="Formation"
                            type="file"
                            onChange={event => { setFile(event.target.files[0]) }}
                        />
                    </Grid>
                    <Grid item>
                       
                            
                                <FormControl style={{marginLeft:"100px"}}>
                                <div style={{ marginTop: "15px", fontSize: "22px" }}>

                            Voulez vous afficher ce document?
                                    </div>

                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                       
                                    >
                                        <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="non" control={<Radio />} label="non" />
                                    </RadioGroup>
                                </FormControl>
                    </Grid>
                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
        </div>
    );
};
export default AjoutDocument;