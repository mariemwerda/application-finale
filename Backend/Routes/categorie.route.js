import express from 'express'
import {getCategories, createCategorie,deleteCategorie,updateCategorie,getCategorieByID} from '../controllers/categories.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();
router.get('/',getCategories);
router.post('/',createCategorie);
router.get('/:_id',getCategorieByID);
router.put('/:_id',updateCategorie);
router.delete('/:_id',deleteCategorie);
export default router;


