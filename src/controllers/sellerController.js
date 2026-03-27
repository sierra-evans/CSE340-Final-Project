import {
    getProductsBySeller,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../models/productModel.js';
import {
    getOrdersBySeller,
    updateOrderStatus,
    getOrderStatuses
} from '../models/orderModel.js';
import pool from '../config/db.js';

// GET /seller/products
export const getSellerDashboard = async (req, res, next) => {
    try {
        const products = await getProductsBySeller(req.session.user.id);
        res.render('seller/dashboard', { products });
    } catch (err) {
        next(err);
    }
};

// GET /seller/products/new
export const getNewProduct = async (req, res, next) => {
    try {
        const categories = await pool.query('SELECT * FROM categories');
        res.render('seller/new-product', { categories: categories.rows });
    } catch (err) {
        next(err);
    }
};

// POST /seller/products
export const postNewProduct = async (req, res, next) => {
    const { title, description, price, stock_quantity, category_id, image_url } = req.body;
    try {
        await createProduct(
            req.session.user.id,
            category_id,
            title,
            description,
            price,
            stock_quantity,
            image_url
        );
        req.flash('success', 'Product submitted for approval');
        res.redirect('/seller/products');
    } catch (err) {
        next(err);
    }
};

// GET /seller/products/:id/edit
export const getEditProduct = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product || product.seller_id !== req.session.user.id) {
            req.flash('error', 'Product not found or access denied');
            return res.redirect('/seller/products');
        }
        const categories = await pool.query('SELECT * FROM categories');
        res.render('seller/edit-product', { product, categories: categories.rows });
    } catch (err) {
        next(err);
    }
};

// POST /seller/products/:id/edit
export const postEditProduct = async (req, res, next) => {
    const { title, description, price, stock_quantity, category_id, image_url } = req.body;
    try {
        await updateProduct(
            req.params.id,
            title,
            description,
            price,
            stock_quantity,
            category_id,
            image_url
        );
        req.flash('success', 'Product updated successfully');
        res.redirect('/seller/products');
    } catch (err) {
        next(err);
    }
};

// POST /seller/products/:id/delete
export const postDeleteProduct = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product || product.seller_id !== req.session.user.id) {
            req.flash('error', 'Product not found or access denied');
            return res.redirect('/seller/products');
        }
        await deleteProduct(req.params.id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/seller/products');
    } catch (err) {
        next(err);
    }
};

// GET /seller/orders
export const getSellerOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersBySeller(req.session.user.id);
        const statuses = getOrderStatuses();
        res.render('seller/orders', { orders, statuses });
    } catch (err) {
        next(err);
    }
};

// POST /seller/orders/:id/status
export const postUpdateOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    try {
        await updateOrderStatus(req.params.id, status);
        req.flash('success', 'Order status updated');
        res.redirect('/seller/orders');
    } catch (err) {
        next(err);
    }
};