"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const error_1 = require("./error");
const utility_class_1 = require("../utils/utility-class");
const User_model_1 = require("../models/User.model");
// middleware for admin access routes
exports.adminOnly = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber } = req.query;
    if (!accountNumber)
        return next(new utility_class_1.ErrorHandler("Please login first to access this route!", 401));
    const user = await User_model_1.User.findOne({ accountNumber });
    if (!user)
        return next(new utility_class_1.ErrorHandler("user not found", 404));
    if (user.role !== "admin")
        return next(new utility_class_1.ErrorHandler("you do not have admin privilege", 401));
    next();
});
