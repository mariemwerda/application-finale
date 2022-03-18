import express from 'express';
import{createDocFormation,getFileByformation,downloadFile, getFileById,updateFile,getFileFiltred} from '../Controllers/docFormations.js';
import { auth } from '../middlewares/auth.js';
import multer from 'multer'
const upload =multer({dest:"./uploads/"})
const router=express.Router();

router.post('/', upload.single("file"), createDocFormation)
router.get('/fileFormation/:id', getFileByformation)
router.get('/:id', getFileById)
router.put('/:id',updateFile)
router.get('/download/:name', downloadFile)
router.get('/FilesFiltred/:id', getFileFiltred)






export default router;