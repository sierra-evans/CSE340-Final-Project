import express from 'express';
import { checkLogin, checkBuyer } from '../middleware/auth.js';
import { getCart, postAddToCart, postRemoveFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', checkLogin, getCart);
router.post('/add', checkBuyer, postAddToCart);
router.post('/remove/:id', checkLogin, postRemoveFromCart);

export default router;