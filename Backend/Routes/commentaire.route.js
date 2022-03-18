import {getCommentaireByFormation, createCommentaire, addReponse} from '../Controllers/commentaires.js';
import { auth } from '../middlewares/auth.js';
import express from 'express'

const router = express.Router();

router.post('/:spds',auth,createCommentaire);
router.get('/:id',auth,getCommentaireByFormation);
router.post('/addReponse/:onezob',auth,addReponse)
export default router