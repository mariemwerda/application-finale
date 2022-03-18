import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { modifierFormation, loadSingleformation } from "../Redux/Actions/formationsActions.js"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom"


const DetailFormation = (props) => {

    const id = props.id
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loadSingleformation(id))
        console.log("hello")
        console.log(id)
    }, [id, dispatch]);

    const formation = useSelector((state) => state.allformations.formation)
    useEffect(() => {

    }, [formation]);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <>          <Paper
            sx={{

                flexGrow: 1,
                background: "linear-gradient(90deg, rgb(0, 57, 116), rgb(29, 104, 179))",
                marginTop: "80px",
                height: "350px",
                color: "white",
            

            }}
        >
            <Grid container spacing={2} sx={{ width: "650px", padding: "50px" }}>

                <Grid item xs={2} sm >
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                                {formation.titre}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {formation.Resume}
                            </Typography>

                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                <Button variant="outlined" >
                                    <Link to={"/DetailFormationInscrit/" + formation._id}>
                                        S'inscrire gratuitement
                                    </Link>

                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>





            <Grid container >
                <Grid item xs={7.5}>
                    <div className="container" style={{ padding: "10px" }}>
                        <div
                            style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" }}>

                            <Card sx={{ maxWidth: 'auto', margin: 1 }}>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                      Description de la formation
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {formation.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4.5}>
                    <div className="container" style={{ paddingTop: "10px"   , marginRight:"100px", backgroundColor:"transparent" }}>
                        <div
                            style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" }}>

                            <Card sx={{ maxWidth: 'auto', margin: 1 ,  }}>

                                <CardContent >
                                   
                              
                                
                                <Typography gutterBottom variant="h5" component="div">
                                <i className="nc-icon nc-globe-2" />   Cours en ligne à 100 %
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Commencez dès maintenant et apprenez aux horaires qui vous conviennent.
                                    </Typography>
                                    <br></br>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <i className="nc-icon nc-chart-bar-32" />  Vers un niveau excellent
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary">
                                    Améliorations des connaissances
                                    </Typography>
                                    <br></br>
                                    <Typography gutterBottom variant="h5" component="div">
                                    <i className="nc-icon nc-glasses-2" />   bonne exploitation des ressources 
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary">
                                    cours simple et détaillé
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </>

    );
};
export default DetailFormation;