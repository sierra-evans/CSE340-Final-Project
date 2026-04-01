import {
    getAllProducts,
    getPendingProducts,
    updateProductStatus,
    deleteProduct
} from '../models/productModel.js';
import { getAllUsers, updateUserRole, deleteUser, getRoleByName } from '../models/userModel.js';
import { getAllOrders } from '../models/orderModel.js';
import { deleteReview } from '../models/reviewModel.js';
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

// POST /admin/reviews/:id/delete
export const adminDeleteReview = async (req, res, next) => {
    const { productId } = req.body;
    try {
      await deleteReview(req.params.id);
      req.flash('success', 'Review removed');
      res.redirect(`/products/${productId}`);
    } catch (err) {
      next(err);
    }
  };

// POST /admin/users/:id/role
export const updateRole = async (req, res, next) => {
    const { role } = req.body;
    try {
      const roleRow = await getRoleByName(role);
      if (!roleRow) {
        req.flash('error', 'Invalid role selected');
        return res.redirect('/admin');
      }
      await updateUserRole(req.params.id, roleRow.id);
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