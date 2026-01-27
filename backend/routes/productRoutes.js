import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsMeta,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/meta', getProductsMeta);
router.get('/:id', getProductById);

// Admin-only routes (no auth required for hardcoded admin)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
