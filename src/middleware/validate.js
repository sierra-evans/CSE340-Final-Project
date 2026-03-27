// Validate registration form
export const validateRegister = (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || name.trim() === '') {
        req.flash('error', 'Name is required');
        return res.redirect('/auth/register');
    }

    if (!email || email.trim() === '') {
        req.flash('error', 'Email is required');
        return res.redirect('/auth/register');
    }

    if (!password || password.length < 6) {
        req.flash('error', 'Password must be at least 6 characters');
        return res.redirect('/auth/register');
    }

    if (!role) {
        req.flash('error', 'Please select a role');
        return res.redirect('/auth/register');
    }

    next();
};

// Validate login form
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === '') {
        req.flash('error', 'Email is required');
        return res.redirect('/auth/login');
    }

    if (!password || password.trim() === '') {
        req.flash('error', 'Password is required');
        return res.redirect('/auth/login');
    }

    next();
};

// Validate product form
export const validateProduct = (req, res, next) => {
    const { title, description, price, stock_quantity } = req.body;

    if (!title || title.trim() === '') {
        req.flash('error', 'Product title is required');
        return res.redirect('back');
    }

    if (!description || description.trim() === '') {
        req.flash('error', 'Product description is required');
        return res.redirect('back');
    }

    if (!price || isNaN(price) || price <= 0) {
        req.flash('error', 'Please enter a valid price');
        return res.redirect('back');
    }

    if (!stock_quantity || isNaN(stock_quantity) || stock_quantity < 0) {
        req.flash('error', 'Please enter a valid stock quantity');
        return res.redirect('back');
    }

    next();
};

// Validate review form
export const validateReview = (req, res, next) => {
    const { rating, comment, productId } = req.body;

    if (!rating) {
        req.flash('error', 'Please select a rating');
        return res.redirect(`/products/${productId}`);
    }

    if (!comment || comment.trim() === '') {
        req.flash('error', 'Comment is required');
        return res.redirect(`/products/${productId}`);
    }

    next();
};