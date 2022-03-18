import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteformation, GetFormationByFormateur } from "../Redux/Actions/formationsActions"
import MUIDataTable from "mui-datatables";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/material/Button';
import { Container } from "reactstrap";
import AjoutFormation from "../views/ajoutFormation";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import Particpant from "./Participant.js"
const StyledModal = styled(ModalUnstyled)`
position: fixed;
z-index: 1300;
right: 0;
bottom: 0;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
`;

const Backdrop = styled('div')`
z-index: -1;
position: fixed;
right: 0;
bottom: 0;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.5);
-webkit-tap-highlight-color: transparent;
`;

function Participants() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetFormationByFormateur());
  }, []);
  const del=(id)=>{

    dispatch(deleteformation(id))

  }
  const data = useSelector((state) => state.allformations.formations);
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: true,
    expandableRows: true, // Try Adding This
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <TableRow>
          <TableCell colSpan={rowData.length}>
            <Particpant id={rowData[0]}   />   
 </TableCell>
        </TableRow>
      );
    }
  };

    
  const columns = [
    {
      label: "id",
      name: "_id",
      options: {
        display: false,
      }
    },
    {
      label: "Titre",
      name: "titre"
    },
    
      
   
      
  ];

  return (

    <div style={{ marginTop: "85px" }}>
      <div>
        <Container>
         
        </Container>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <Box >
           
          </Box>
        </StyledModal>
      </div>
      <React.Fragment  >


        <MUIDataTable
          title={"Liste des formations"}
          data={data}
          columns={columns}
          options={options}
        />
      </React.Fragment>
    </div>
  );
}

export default Participants;
