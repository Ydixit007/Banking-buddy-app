"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = exports.getTransactions = exports.depositMoney = exports.transferMoney = void 0;
const error_1 = require("../middlewares/error");
const utility_class_1 = require("../utils/utility-class");
const User_model_1 = require("../models/User.model");
const Transactions_model_1 = require("../models/Transactions.model");
exports.transferMoney = (0, error_1.TryCatch)(async (req, res, next) => {
    const { sender, receiver, amount } = req.body;
    if (!sender || !receiver || !amount)
        return next(new utility_class_1.ErrorHandler("please fill all fields to proceed", 400));
    if (amount <= 0)
        return next(new utility_class_1.ErrorHandler("Amount cannot be zero or negative", 500));
    const senderUser = await User_model_1.User.findOne({ accountNumber: sender });
    const receiverUser = await User_model_1.User.findOne({ accountNumber: receiver });
    if (!senderUser || !receiverUser)
        return next(new utility_class_1.ErrorHandler("Can't find the user", 400));
    if (amount > senderUser.accountBalance)
        return next(new utility_class_1.ErrorHandler("Enough account balance", 400));
    const transaction = await Transactions_model_1.Transaction.create({
        sender: senderUser?.accountNumber,
        receiver: receiverUser?.accountNumber,
        amount: amount,
        type: "transfer",
    });
    senderUser.accountBalance -= amount;
    receiverUser.accountBalance += amount;
    await senderUser.save();
    await receiverUser.save();
    res.status(201).json({
        success: true,
        transaction,
    });
});
exports.depositMoney = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber, amount } = req.body;
    if (!accountNumber || !amount)
        return next(new utility_class_1.ErrorHandler("please fill all fields to proceed", 400));
    if (amount <= 0)
        return next(new utility_class_1.ErrorHandler("Amount cannot be zero or negative", 500));
    const user = await User_model_1.User.findOne({ accountNumber });
    if (!user)
        return next(new utility_class_1.ErrorHandler("Can't find the user", 400));
    const transaction = await Transactions_model_1.Transaction.create({
        sender: user.accountNumber,
        receiver: user.accountNumber,
        amount: amount,
    });
    user.accountBalance += amount;
    await user.save();
    res.status(201).json({
        success: true,
        message: "Deposit successful",
    });
});
exports.getTransactions = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber } = req.params;
    if (!accountNumber)
        return next(new utility_class_1.ErrorHandler("Please login first", 400));
    const transactions = await Transactions_model_1.Transaction.find({
        $or: [{ sender: accountNumber }, { receiver: accountNumber }],
    })
        .sort({ createdAt: "desc" })
        .limit(10);
    if (!transactions)
        return next(new utility_class_1.ErrorHandler("No transactions found", 404));
    return res.status(200).json({
        success: true,
        transactions,
    });
});
exports.getAllTransactions = (0, error_1.TryCatch)(async (req, res, next) => {
    const currentPage = Number(req.query.page) || 1;
    const perPage = 10;
    const page = Math.max(0, currentPage);
    const transactions = await Transactions_model_1.Transaction.find({})
        .sort({ createdAt: "desc" })
        .limit(perPage)
        .skip(perPage * page);
    const total = await Transactions_model_1.Transaction.countDocuments();
    if (!transactions || !total)
        return next(new utility_class_1.ErrorHandler("No transactions found", 404));
    return res.status(200).json({
        success: true,
        transactions,
        total
    });
});
