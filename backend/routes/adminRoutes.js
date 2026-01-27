import express from 'express';
import { adminLogin, uploadImage } from '../controllers/adminController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/upload-image', upload.single('image'), uploadImage);

export default router;
