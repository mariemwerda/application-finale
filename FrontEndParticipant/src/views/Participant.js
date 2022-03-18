import React, { useState, useEffect } from "react";

import MUIDataTable from "mui-datatables";

import { FormationService } from "../Services/Formation-service.js"
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
  } from "@material-ui/core/styles";

function Participant(props) {
    const getMuiTheme = () =>
    createMuiTheme({
        overrides: {
            MUIDataTable: {
              root: {
                backgroundColor: "#FF000"
              },
              paper: {
                boxShadow: "none"
              }
            },
            MUIDataTableBodyCell: {
              root: {
                backgroundColor: "#FF0000"
              }
            }
          }
      
    });
    const id =props.id
    const [data,setData]=useState([]);

  useEffect(() => {
    FormationService.GetParticipantByFormation(id)
    .then(res => {
      setData(res.data)
    }).catch((error) => console.log(error));
   
  }, []);
  
const options={
    pagination: false,
    selectableRows:false,
    fixedHeader:false,
    filter:false,
    search:false,
    print:false,
    download:false,
    sortFilterList:false,
    fixedHeader:false,
    viewColumns:false
};

    
  const columns = [
   
    {
      label: "Participant",
      name: "nom"
    },
    {
        label: "Email",
        name: "email"
      },

  ];
 
  return (

   
     
<MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
         
          data={data}
          columns={columns}
          options={options}
        />
</MuiThemeProvider>
  );
}

export default Participant;
