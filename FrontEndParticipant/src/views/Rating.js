import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { NoteService } from 'Services/note-service';
import { useEffect } from 'react';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export default function HoverRating(props) {
    const id=props.id;
  const [value, setValue] = React.useState(4);
  const [hover, setHover] = React.useState(-1);
  useEffect(() => {
  NoteService.getNoteByFormationUser(id)
  
  .then(res => {
alert("succes")
    }).catch((error) => console.log(error));

      
  }, [id]);
  const setRate=(newValue)=>{
      setValue(newValue);
      const rep={
          note:newValue,
          formationID:id
      }
      NoteService.addNote(rep).then(res => {
    alert("merci d'évaluer cette formation ");

        console.log(res.data);
        NoteService.getNoteByFormationUser(id);
    }).catch((error) => console.log(error));
  };
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setRate(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
     
    </Box>
  );
}