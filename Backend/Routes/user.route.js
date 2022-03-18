import express from 'express';
import { createUser, getuserBYEmail, listFormationByUser,getUserByFormation } from '../Controllers/users.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();
router.post('/', createUser);
router.post('/login', getuserBYEmail);
router.post('/listFormationByUser', auth, listFormationByUser)
router.get('/listusersByFormation/:formationID',getUserByFormation)


export default router;