// Global error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // If response already sent, pass to default Express handler 
    if (res.headersSent) { return next(err); }

    const status = err.status || 500;

    res.status(status).render("error", { 
        status, 
        message: err.message || "Something went wrong", 
        detail: process.env.NODE_ENV === "development" ? err.stack : null 
    });
};

export default errorHandler;