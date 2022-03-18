import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { modifierFormation, loadSingleformation, GetFormateur } from "../Redux/Actions/formationsActions.js"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormationService } from "Services/Formation-service.js";
import { FileService } from "Services/File-services.js";
import FileDownload from "js-file-download";
import Box from '@mui/material/Box';
import { CommentaireService } from "../Services/Commentaire-Service.js"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MakeReviews from "./Rating.js"
const DetailFormationInscrit = (props) => {

    const params = useParams();
    const id = params.id;
    const propsId = props.id;
    const dispatch = useDispatch();
    const history = useHistory()
    const [files, setFiles] = useState([]);
    const [commentaires, setCommentaires] = useState([]);
    const [formateur, setFormateur] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const [reponse, setReponse] = useState("");
    const [formationId, SetFormationId] = useState("");
    const [expanded, setExpanded] = React.useState(false);
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >

        </Box>
    );
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const download = (file) => {
        FileService.downloadFile(file)
            .then(res => {
                FileDownload(res.data, file);
            }).catch((error) => console.log(error));


    }
    const enregistrerCommentaire = (e) => {
        if (e.keyCode == 13) {
            const cmntr = {
                formationID: formationId,
                commentaire: commentaire
            }
            CommentaireService.AddCommentaireToFormation(cmntr).then(res => {
                setCommentaire("")
            }).catch((error) => console.log(error));

        }
        return;
    }
    useEffect(() => {

        const mail = localStorage.getItem("mail");
        if (mail != null) {
            if (propsId == undefined) {
                SetFormationId(id)
                dispatch(loadSingleformation(id));
                FormationService.AddUserToFormation(id)
                FormationService.GetFormateur(id).then(res => {
                    setFormateur(res.data)
                    console.log(res.data)
                }).catch((error) => console.log(error));


            }
            else {
                SetFormationId(propsId)

                dispatch(loadSingleformation(propsId));
                FormationService.GetFormateur(propsId).then(res => {
                    setFormateur(res.data)
                    console.log(res.data)
                }).catch((error) => console.log(error));
            }


        }
        else {
            history.push("../signup")
        }
    }, []);

    useEffect(() => {
        const mail = localStorage.getItem("mail");
        if (mail != null) {
            CommentaireService.GetCommentaires(formationId).then(res => {
                setCommentaires(res.data)
                console.log(res.data)
            }).catch((error) => console.log(error));
        }



    }, [formationId, commentaire,reponse]);

    const formation = useSelector((state) => state.allformations.formation)
    useEffect(() => {
        FileService.getFilesFiltred(formation._id).then(res => {
            setFiles(res.data)
            console.log(res.data)
        }).catch((error) => console.log(error));


    }, [formation]);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    const enregistrerReponse = (e,id) => {
        if (e.keyCode == 13) {
           
            
            const rep = {
                commentaireID: id,
                reponse: reponse
            }
            CommentaireService.AddReponse(rep).then(res => {
                setReponse("")
            }).catch((error) => console.log(error));
            

        }
        return;
    }  
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
                            <Typography sx={{ cursor: 'pointer' }} variant="body1" style={{ color: "#ffb22e" }}>

                                Vous etes inscrit à cette formation

                            </Typography>
                            <Typography sx={{ cursor: 'pointer', fontSize: " 18px" }}>


                                <img
                                    src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                                    style={{
                                        width: "50px",
                                        height: "50px"
                                    }}
                                ></img>  {formateur}

                            </Typography>
                            <Typography sx={{ cursor: 'pointer', fontSize: " 18px" }}>
                                Notez-nous
                                {
                                    <MakeReviews id={formationId}/>
                                }

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
                                    <Typography gutterBottom variant="h6" component="div">
                                        <table style={{ width: "700px" }}>
                                            <thead>
                                                <tr>
                                                    <th>Titre</th>
                                                    <th>Download</th>

                                                </tr>
                                            </thead>
                                            {files.map((file, ind) => {

                                                return <tbody>
                                                    <tr>
                                                        <td>{file.description}</td>
                                                        <td>   <Button color="primary"
                                                            onClick={() => { download(file.docformation) }}>
                                                            {file.docformation}
                                                        </Button>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            })}
                                        </table>
                                    </Typography>

                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Card>
                        </div>
                    </div>
                    <Grid item xs={11.6}>
                        <Card sx={{ maxWidth: 'auto', marginLeft: 3, padding: "10px" }}>

                            <CardContent >
                                {commentaires.map((cmntr, ind) => {

                                    return <div>
                                        <Grid style={{borderRadius: "30px", Border:"solid", backgroundColor:"#EFECEB"}}>
                                            <Grid xs={4}>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    <img
                                                        src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    ></img>
                                                    {cmntr.userID.nom}
                                                    <Typography variant="body1" component="div">
                                                                        {cmntr.userID.role == "formatteur" &&
                                                                            <div style={{
                                                                                fontFamily: "Georgia, serif",
                                                                                fontSize: "15px",
                                                                                wordSpacing: "1.2px",
                                                                                fontWeight: "400",
                                                                                textDecoration: "underline solid rgb(68, 68, 68)",
                                                                                fontStyle: "italic",
                                                                                fontVariant: "normal",
                                                                                textTransform: "none"
                                                                            }}>
                                                                                formateur
                                                                            </div>
                                                                        }
                                                                    </Typography>
                                                </Typography>
                                            </Grid>
                                            <Grid xs={8}>
                                                <Typography gutterBottom variant="body1" component="div" style={{ marginLeft: "70px", marginBottom: "40px" }}>
                                                    {cmntr.commentaire}
                                                    <Typography gutterBottom variant="body1" component="div" style={{ marginLeft: "70px", marginBottom: "40px" }}>
                                                    {cmntr.reponses.map((reponse, ind) => {
                                                         
                                                         return <div>
                                                             <Typography gutterBottom variant="h6" component="div">
                                                    <img
                                                        src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    ></img>
                                                    {reponse.userID.nom} 
                                                    {reponse.userID.role=="formatteur" &&
                                                     <div style={{
                                                        fontFamily: "Georgia, serif",
                                                        fontSize: "15px",
                                                        wordSpacing: "1.2px",
                                                        fontWeight: "400",
                                                        textDecoration: "underline solid rgb(68, 68, 68)",
                                                        fontStyle: "italic",
                                                        fontVariant: "normal",
                                                        textTransform: "none",
                                                        marginLeft:"50px",
                                                        marginTop:"-10px"
                                                    }}>
                                                        formateur
                                                        </div>
                                                    }
                                                   
                                                </Typography>
                                                <Typography style={{ marginLeft: "60px", borderBottom: "1px groove rgba(28,110,164,0.65)",
                                                                    borderRadius:" 11px 0px 0px 36px"}}>
                                                   < div style={{marginLeft:"20px"}}>
                                                                {reponse.reponse}
                                                                </div>
                                                </Typography>
                                                        </div>
                                                    })}
                                                
                                                    </Typography>
                                                    
                                                    <Accordion expanded={expanded === 'panel' + ind} onChange={handleChange('panel' + ind)} style={{ marginTop: "10px", boxShadow: "none", backgroundColor:"transparent" }}>
                                                        <AccordionSummary
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                            <Typography sx={{ width: '33%', flexShrink: 0, marginLeft: "20px", textDecoration: "underline" }}>
                                                                Rèpondre
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>    
                                <Box
                                    sx={{
                                        width: 450,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Grid>
                                        <Grid xs={2}>
                                            <img
                                                src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                                                style={{
                                                    width: "40px",
                                                    height: "40px"
                                                }}
                                            ></img>
                                        </Grid>
                                        <Grid xs={10} style={{marginLeft:"50px", marginTop:"-55px"}}>
                                            <TextField fullWidth label="Ecrivez votre commentaire ..."
                                                value={reponse}

                                                onChange={e => {

                                                    e.stopPropagation();
                                                    setReponse(e.target.value)
                                                }}
                                                onKeyDown={e => {
                                                    e.stopPropagation();

                                                    enregistrerReponse(e,cmntr._id)
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                                        </AccordionDetails>
                                                    </Accordion>

                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                })}

                                <Box
                                    sx={{
                                        width: 450,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <Grid>
                                        <Grid xs={2}>
                                            <img
                                                src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png"
                                                style={{
                                                    width: "40px",
                                                    height: "40px"
                                                }}
                                            ></img>
                                        </Grid>
                                        <Grid xs={10} style={{marginLeft:"50px", marginTop:"-55px"}}>
                                            <TextField fullWidth label="Ecrivez votre commentaire ..."
                                                value={commentaire}

                                                onChange={e => {

                                                    e.stopPropagation();
                                                    setCommentaire(e.target.value)
                                                }}
                                                onKeyDown={e => {
                                                    e.stopPropagation();

                                                    enregistrerCommentaire(e)
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>



                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={4.5}>
                    <div className="container" style={{ paddingTop: "10px", marginRight: "100px", backgroundColor: "transparent" }}>
                        <div
                            style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center" }}>

                            <Card sx={{ maxWidth: 'auto', margin: 1, }}>

                                <CardContent >



                                    <Typography gutterBottom variant="h6" component="div">
                                        <i className="nc-icon nc-globe-2" />   Cours en ligne à 100 %
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Commencez dès maintenant et apprenez aux horaires qui vous conviennent.
                                    </Typography>
                                    <br></br>
                                    <Typography gutterBottom variant="h6" component="div">
                                        <i className="nc-icon nc-chart-bar-32" />  Vers un niveau excellent
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Améliorations des connaissances
                                    </Typography>
                                    <br></br>
                                    <Typography gutterBottom variant="h6" component="div">
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
export default DetailFormationInscrit;