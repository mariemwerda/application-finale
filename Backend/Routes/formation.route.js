import express from 'express';
import{getFormations,CheckInscription,getParticipantByUser,GetFormateur,getFormationByID,createFormation,updateFormation,deleteFormation,getFormationByCAT,addUserToFormation,getFormationByUser}from '../Controllers/formations.js';
import { auth } from '../middlewares/auth.js';
const router=express.Router();
router.get('/',getFormations);
router.get('/:_id',getFormationByID)
router.post('/',auth, createFormation)
router.put('/:_id',auth,updateFormation)
router.delete('/:_id',auth, deleteFormation);
router.get('/affparcat/:categorieID', getFormationByCAT);
router.post('/inscrire/:id',auth,addUserToFormation);
router.get('/formationUser/:fyiugo',auth,getFormationByUser);
router.get('/participant/:id',auth,getParticipantByUser);
router.get('/checkInsription/:id',auth,CheckInscription)
router.get('/getFormateur/:id',auth, GetFormateur)



export default router;