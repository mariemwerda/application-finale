import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {GetFormations} from "../Redux/Actions/formationsActions"
import { Link } from "react-router-dom";
import { FormationService } from 'Services/Formation-service';

export default function FormationsInscris() {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState([]);

  const dispatch = useDispatch();
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      
    </Box>
  );
  
  useEffect(() => {
   FormationService.GetFormationInscrites()
   .then(res => {
        setData(res.data)
}).catch((error) => console.log(error));

  }, []);

  
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
useEffect(() => {
  
console.log(data)
  
}, [data]);
  return (
    <div style={{margin:"83px"}}>
     
      {data.map((forma,ind)=>{ 
        
       return <div>
      <Accordion expanded={expanded === 'panel'+ind} onChange={handleChange('panel'+ind)}  style={{marginTop:"10px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           {forma.titre}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined"> 
      <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {forma.Resume}
       
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" color="secondary">
       <Link to={"checkInscription/" +forma._id}>
     En savoir plus ...
      </Link>
      
      </Button>
      </CardActions>
    </React.Fragment>
    </Card>
    </Box>
        </AccordionDetails>
      </Accordion>
      </div>
      })}
    </div>
  );
}




