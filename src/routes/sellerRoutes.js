import express from 'express';
import { checkSeller } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validate.js';
import {
  getSellerDashboard,
  getNewProduct,
  postNewProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getSellerOrders,
  postUpdateOrderStatus
} from '../controllers/sellerController.js';

const router = express.Router();

router.get('/products', checkSeller, getSellerDashboard);
router.get('/products/new', checkSeller, getNewProduct);
router.post('/products', checkSeller, validateProduct, postNewProduct);
router.get('/products/:id/edit', checkSeller, getEditProduct);
router.post('/products/:id/edit', checkSeller, validateProduct, postEditProduct);
router.post('/products/:id/delete', checkSeller, postDeleteProduct);
router.get('/orders', checkSeller, getSellerOrders);
router.post('/orders/:id/status', checkSeller, postUpdateOrderStatus);

export default router;