import express from 'express';
import { checkLogin, checkBuyer } from '../middleware/auth.js';
import { validateReview } from '../middleware/validate.js';
import {
    postCreateReview,
    getEditReview,
    postEditReview,
    postDeleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', checkBuyer, validateReview, postCreateReview);
router.get('/:id/edit', checkLogin, getEditReview);
router.post('/:id/edit', checkLogin, postEditReview);
router.post('/:id/delete', checkLogin, postDeleteReview);

export default router;