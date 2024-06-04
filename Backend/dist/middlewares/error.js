"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (err, req, res, next) => {
    // Error handling logic here
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid Id";
    if (err.message === "jwt expired" || err.message === "jwt must be provided")
        err.message = "Session Expired";
    // Send the error response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.TryCatch = TryCatch;
