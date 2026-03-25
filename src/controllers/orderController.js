import { createOrder, createOrderItem, getOrdersByBuyer, getOrderById, getOrderItems, updateOrderStatus } from '../models/orderModel.js';
import { getCartByUser, clearCart } from '../models/cartModel.js';

// GET /orders
export const getOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersByBuyer(req.session.user.id);
        res.render('orders/index', { orders });
    } catch (err) {
        next(err);
    }
};

// GET /orders/:id
export const getOrderDetail = async (req, res, next) => {
    try {
        const order = await getOrderById(req.params.id);
        if (!order || order.buyer_id !== req.session.user.id) {
            req.flash('error', 'Order not found');
            return res.redirect('/orders');
        }
        const orderItems = await getOrderItems(req.params.id);
        res.render('orders/detail', { order, orderItems });
    } catch (err) {
        next(err);
    }
};

// POST /checkout
export const postCheckout = async (req, res, next) => {
    try {
        // Get cart items
        const cartItems = await getCartByUser(req.session.user.id);
        if (cartItems.length === 0) {
            req.flash('error', 'Your cart is empty');
            return res.redirect('/cart');
        }

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order
        const order = await createOrder(req.session.user.id, total);

        // Create order items
        for (const item of cartItems) {
            await createOrderItem(order.id, item.product_id, item.quantity, item.price);
        }

        // Clear cart
        await clearCart(req.session.user.id);

        req.flash('success', 'Order placed successfully!');
        res.redirect(`/orders/${order.id}`);
    } catch (err) {
        next(err);
    }
};

// POST /orders/:id/status (seller updates order status)
export const postUpdateOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    try {
        await updateOrderStatus(req.params.id, status);
        req.flash('success', 'Order status updated');
        res.redirect('/seller/products');
    } catch (err) {
        next(err);
    }
};