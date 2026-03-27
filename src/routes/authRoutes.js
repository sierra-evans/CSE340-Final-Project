import express from 'express';
import { getRegister, getLogin, postRegister, postLogin, logout } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validate.js';

const router = express.Router();

router.get('/register', getRegister);
router.get('/login', getLogin);
router.post('/register', validateRegister, postRegister);
router.post('/login', validateLogin, postLogin);
router.get('/logout', logout);

export default router;