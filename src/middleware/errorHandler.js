// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Default error values
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    // Don't leak error details in production
    const detail = process.env.NODE_ENV === 'development' ? err.stack : null;

    res.status(status).render('error', { status, message, detail });
};

export default errorHandler;