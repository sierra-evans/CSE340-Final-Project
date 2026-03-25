import {
    getAllProducts,
    getPendingProducts,
    updateProductStatus,
    deleteProduct
} from '../models/productModel.js';
import { getAllUsers, updateUserRole, deleteUser } from '../models/userModel.js';
import { getAllOrders } from '../models/orderModel.js';
import pool from '../config/db.js';

// GET /admin
export const getAdminDashboard = async (req, res, next) => {
    try {
        const pendingProducts = await getPendingProducts();
        const users = await getAllUsers();
        const orders = await getAllOrders();
        res.render('admin/dashboard', { pendingProducts, users, orders });
    } catch (err) {
        next(err);
    }
};

// POST /admin/products/:id/approve
export const approveProduct = async (req, res, next) => {
    try {
        await updateProductStatus(req.params.id, 'approved');
        req.flash('success', 'Product approved successfully');
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

// POST /admin/products/:id/reject
export const rejectProduct = async (req, res, next) => {
    try {
        await updateProductStatus(req.params.id, 'rejected');
        req.flash('success', 'Product rejected');
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

// POST /admin/products/:id/delete
export const adminDeleteProduct = async (req, res, next) => {
    try {
        await deleteProduct(req.params.id);
        req.flash('success', 'Product deleted');
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

// POST /admin/users/:id/role
export const updateRole = async (req, res, next) => {
    const { role } = req.body;
    try {
        const roleResult = await pool.query(
            'SELECT id FROM roles WHERE name = $1',
            [role]
        );
        const roleId = roleResult.rows[0]?.id;
        await updateUserRole(req.params.id, roleId);
        req.flash('success', 'User role updated');
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

// POST /admin/users/:id/delete
export const adminDeleteUser = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        req.flash('success', 'User deleted');
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};