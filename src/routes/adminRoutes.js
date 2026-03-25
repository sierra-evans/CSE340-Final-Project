import express from 'express';
import { checkAdmin } from '../middleware/auth.js';
import {
  getAdminDashboard,
  approveProduct,
  rejectProduct,
  adminDeleteProduct,
  updateRole,
  adminDeleteUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', checkAdmin, getAdminDashboard);
router.post('/products/:id/approve', checkAdmin, approveProduct);
router.post('/products/:id/reject', checkAdmin, rejectProduct);
router.post('/products/:id/delete', checkAdmin, adminDeleteProduct);
router.post('/users/:id/role', checkAdmin, updateRole);
router.post('/users/:id/delete', checkAdmin, adminDeleteUser);

export default router;