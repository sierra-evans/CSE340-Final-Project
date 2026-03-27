import { getAllProducts, getProductById } from '../models/productModel.js';
import { getReviewsByProduct } from '../models/reviewModel.js';

// GET /products
export const getProducts = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.render('products/list', { products });
    } catch (err) {
        next(err);
    }
};

// GET /products/:id
export const getProductById_ctrl = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/products');
        }
        const reviews = await getReviewsByProduct(req.params.id);
        res.render('products/detail', { product, reviews });
    } catch (err) {
        next(err);
    }
};