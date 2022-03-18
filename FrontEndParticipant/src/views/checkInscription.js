import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import Axios from "../Axios/Api";
import {FormationService }from "../Services/Formation-service.js"
import DetailFormation from "./DetailFormation";
import Formation from "./Formation";
    
import DetailFormationInscription from "./DetailFormationInscrit"


function CheckInscription () {

    const history=useHistory()
    const params = useParams();
    const id = params.id;
    const [inscrit, setInscrit]=useState(false);

useEffect(() => {

    

    FormationService.checkInscription(id).then(res => {
       setInscrit(res.data.inscrit)
        })
    

}, [id]);

    
   

   
    return (
      
          <div>
{
    inscrit ? 
    <DetailFormationInscription id={id}/>:
    <DetailFormation id={id}/>

}

      </div>


    );
}

export default CheckInscription;
