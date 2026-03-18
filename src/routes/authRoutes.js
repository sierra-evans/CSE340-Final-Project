import express from 'express';
import { getRegister, getLogin, postRegister, postLogin, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/register', getRegister);
router.get('/login', getLogin);
router.post('/register', postRegister);
router.post('/login', postLogin);
router.get('/logout', logout);

export default router;