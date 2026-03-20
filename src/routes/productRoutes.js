import express from 'express';
import { getProducts, getProductById_ctrl } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById_ctrl);

export default router;