import express from 'express';
import { checkSeller } from '../middleware/auth.js';
import {
  getSellerDashboard,
  getNewProduct,
  postNewProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
} from '../controllers/sellerController.js';

const router = express.Router();

router.get('/products', checkSeller, getSellerDashboard);
router.get('/products/new', checkSeller, getNewProduct);
router.post('/products', checkSeller, postNewProduct);
router.get('/products/:id/edit', checkSeller, getEditProduct);
router.post('/products/:id/edit', checkSeller, postEditProduct);
router.post('/products/:id/delete', checkSeller, postDeleteProduct);

export default router;