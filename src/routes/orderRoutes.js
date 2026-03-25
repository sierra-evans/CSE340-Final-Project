import express from 'express';
import { checkLogin } from '../middleware/auth.js';
import { getOrders, getOrderDetail, postCheckout, postUpdateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', checkLogin, getOrders);
router.get('/:id', checkLogin, getOrderDetail);
router.post('/checkout', checkLogin, postCheckout);
router.post('/:id/status', checkLogin, postUpdateOrderStatus);

export default router;