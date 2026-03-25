import { getCartByUser, addToCart, removeFromCart, clearCart } from '../models/cartModel.js';
import { getProductById } from '../models/productModel.js';

// GET /cart
export const getCart = async (req, res, next) => {
    try {
        const cartItems = await getCartByUser(req.session.user.id);
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        res.render('cart/index', { cartItems, total });
    } catch (err) {
        next(err);
    }
};

// POST /cart/add
export const postAddToCart = async (req, res, next) => {
    const { productId, quantity } = req.body;
    try {
        const product = await getProductById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }
        await addToCart(req.session.user.id, productId, quantity);
        req.flash('success', 'Item added to cart');
        res.redirect('/cart');
    } catch (err) {
        next(err);
    }
};

// POST /cart/remove/:id
export const postRemoveFromCart = async (req, res, next) => {
    try {
        await removeFromCart(req.params.id);
        req.flash('success', 'Item removed from cart');
        res.redirect('/cart');
    } catch (err) {
        next(err);
    }
};