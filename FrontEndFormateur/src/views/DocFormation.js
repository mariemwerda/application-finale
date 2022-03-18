import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletefile, GetFileByFormation } from "../Redux/Actions/filesActions.js"
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { FileService } from "../Services/File-services.js"
import FileDownload from "js-file-download";
import ChangerAffichage from "./ChangerAffichage.js";
import {
    createTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";

function DocFormation(props) {

    const getMuiTheme = () =>
        createTheme({
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
    const id = props.id
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [etat, setEtat] = useState(false);

    const [checked, setChecked] = React.useState(true)
    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(checked)
    };


    const onChangeEtat = () => {
     if(etat==false)
        setEtat(true);
        else 
        setEtat(false)
    }

useEffect(() => {
    FileService.GetFileByFormation(id)
    .then(res => {
        setData(res.data)
    }).catch((error) => console.log(error));

    
}, [etat]);

    useEffect(() => {
        FileService.GetFileByFormation(id)
            .then(res => {
                setData(res.data)
            }).catch((error) => console.log(error));



    }, []);



    const del = (id) => {

        dispatch(deletefile(id))

    }
    const download = (file) => {
        FileService.downloadFile(file)
            .then(res => {
                FileDownload(res.data, file);
            }).catch((error) => console.log(error));


    }

    const options = {
        pagination: false,
        selectableRows: false,
        fixedHeader: false,
        filter: false,
        search: false,
        print: false,
        download: false,
        sortFilterList: false,
        fixedHeader: false,
        viewColumns: false
    };


    const columns = [

        {
            label: "Description",
            name: "description"
        },

        {
            name: "docformation",
            label: "document",
            options: {
                customBodyRender: (value) => (

                    <Button color="primary"
                        onClick={() => { download(value) }}>
                        {value}
                    </Button>


                )
            },
        },
        {
            label: "Etat",
            name: "isSelected",
            options: {
                customBodyRender: (value) => (
                    <div>
                        
                        {value ? 'affiché' : "non affiché"
                        }

                    </div>
                )
            },
        },
        {
            name: "_id",
            label: " modifier Etat",
            options: {
                customBodyRender: (value) => (

                    <ChangerAffichage id={value} changeEtat={onChangeEtat}/>

                )
            },
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

export default DocFormation;
