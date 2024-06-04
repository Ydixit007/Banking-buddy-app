"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getAllUsers = exports.getUserFromDatabase = exports.verifyUserToken = exports.loginUser = exports.createUser = void 0;
const error_js_1 = require("../middlewares/error.js");
const utility_class_js_1 = require("../utils/utility-class.js");
const User_model_js_1 = require("../models/User.model.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const features_js_1 = require("../utils/features.js");
exports.createUser = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { fullName, address, dob, email, password, phone } = req.body;
    if (!fullName ||
        !dob ||
        !email ||
        !password ||
        !phone)
        return next(new utility_class_js_1.ErrorHandler("Input fields missing, Please add all fields to continue", 400));
    let user = await User_model_js_1.User.findOne({ email });
    if (user) {
        return res.status(200).json({
            success: true,
            message: `welcome back, ${user.fullName}`,
        });
    }
    const accountNumber = Math.round(Math.random() * 10000000000);
    const encryptedPassword = await bcryptjs_1.default.hash(password, 10);
    user = await User_model_js_1.User.create({
        fullName,
        address,
        dob: new Date(dob),
        email,
        password: encryptedPassword,
        phone,
        accountNumber,
    });
    if (!user)
        return next(new utility_class_js_1.ErrorHandler("User creation failed", 500));
    res.status(201).json({
        success: true,
        message: "user has been created",
    });
});
exports.loginUser = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new utility_class_js_1.ErrorHandler("Email or password missing", 400));
    const user = await User_model_js_1.User.findOne({ email });
    if (!user)
        return next(new utility_class_js_1.ErrorHandler("user does not exists", 404));
    const passwordCorrect = await bcryptjs_1.default.compare(password, user.password);
    if (passwordCorrect) {
        user.password = "";
        const key = process.env.JWT_SECRET || "";
        const token = jsonwebtoken_1.default.sign({ email: email }, key, { expiresIn: "300s" });
        res.status(200).json({
            success: true,
            user,
            token,
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: "Incorrect password",
        });
    }
});
exports.verifyUserToken = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { token } = req.body;
    const user = (0, features_js_1.verifyJwtToken)(token);
    res.status(200).json({
        success: true,
        user,
    });
});
exports.getUserFromDatabase = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        const user = await User_model_js_1.User.findOne({ accountNumber: id });
        if (!user)
            return next(new utility_class_js_1.ErrorHandler("Account number does not exists", 400));
        res.status(200).json({
            success: true,
            user,
        });
    }
    else {
        return next(new utility_class_js_1.ErrorHandler("Incorrect / account number does not exists", 400));
    }
});
exports.getAllUsers = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const users = await User_model_js_1.User.find({});
    if (!users)
        return next(new utility_class_js_1.ErrorHandler("something went wrong, users does not exists", 404));
    res.status(200).json({
        success: true,
        users,
    });
});
exports.updateUser = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { fullName, address, phone, accountNumber } = req.body;
    if (accountNumber) {
        const user = await User_model_js_1.User.findOne({ accountNumber });
        if (!user)
            return next(new utility_class_js_1.ErrorHandler("user does not exists", 404));
        if (fullName)
            user.fullName = fullName;
        if (address)
            user.address = address;
        if (phone)
            user.phone = phone;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User has been updated successfully.",
        });
    }
    else {
        return next(new utility_class_js_1.ErrorHandler("account number missing", 400));
    }
});
