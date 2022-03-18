import {getNoteByFormationUser, getNoteGlobal, addNote} from '../Controllers/notes.js';
import { auth } from '../middlewares/auth.js';
import express from 'express'

const router = express.Router();

router.get('/global/:id',auth,getNoteGlobal);
router.get('/:id',auth,getNoteByFormationUser);
router.post('/addReponse',auth,addNote)
export default router