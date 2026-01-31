import express from 'express';
import multer from 'multer';
import { adminLogin, bulkUploadProducts, uploadImage } from '../controllers/adminController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

const excelUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const okMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/octet-stream',
    ];
    if (okMimes.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Only Excel files are allowed'));
  },
});

router.post('/login', adminLogin);
router.post('/upload-image', upload.single('image'), uploadImage);
router.post('/bulk-upload-products', excelUpload.single('file'), bulkUploadProducts);

export default router;
