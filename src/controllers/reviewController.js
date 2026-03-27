import {
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview,
    getReviewById
} from '../models/reviewModel.js';

// POST /reviews
export const postCreateReview = async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    try {
        if (!rating || !comment || comment.trim() === '') {
            req.flash('error', 'Rating and comment are required');
            return res.redirect(`/products/${productId}`);
        }
        await createReview(req.session.user.id, productId, rating, comment);
        req.flash('success', 'Review submitted successfully');
        res.redirect(`/products/${productId}`);
    } catch (err) {
        next(err);
    }
};

// GET /reviews/:id/edit
export const getEditReview = async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);
        if (!review || review.user_id !== req.session.user.id) {
            req.flash('error', 'Review not found or access denied');
            return res.redirect('/products');
        }
        res.render('reviews/edit', { review });
    } catch (err) {
        next(err);
    }
};

// POST /reviews/:id/edit
export const postEditReview = async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    try {
        if (!rating || !comment || comment.trim() === '') {
            req.flash('error', 'Rating and comment are required');
            return res.redirect(`/reviews/${req.params.id}/edit`);
        }
        await updateReview(req.params.id, rating, comment);
        req.flash('success', 'Review updated successfully');
        res.redirect(`/products/${productId}`);
    } catch (err) {
        next(err);
    }
};

// POST /reviews/:id/delete
export const postDeleteReview = async (req, res, next) => {
    const { productId } = req.body;
    try {
        await deleteReview(req.params.id);
        req.flash('success', 'Review deleted');
        res.redirect(`/products/${productId}`);
    } catch (err) {
        next(err);
    }
};