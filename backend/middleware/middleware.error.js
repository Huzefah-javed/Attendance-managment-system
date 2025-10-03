export function errorMiddleware(err, req, res, next) {
    const status = err.status || 500;
    const msg = err.msg || err.message || "An unknown error occurred.";

    return res.status(status).json({
        success: false,
        message: msg,
    });
}