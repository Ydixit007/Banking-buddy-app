"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoanDetails = exports.getAllLoans = exports.getAllLoanforUser = exports.updateLoan = exports.applyNewLoan = void 0;
const error_1 = require("../middlewares/error");
const utility_class_1 = require("../utils/utility-class");
const Loan_model_1 = require("../models/Loan.model");
const User_model_1 = require("../models/User.model");
const Transactions_model_1 = require("../models/Transactions.model");
exports.applyNewLoan = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber, loanAmount, dueDate } = req.body;
    if (!accountNumber || !loanAmount || !dueDate)
        return next(new utility_class_1.ErrorHandler("Fileds are missing", 400));
    const loan = Loan_model_1.Loan.create({
        accountNumber,
        loanAmount,
        appliedOn: Date.now(),
        dueDate,
    });
    res.status(201).json({
        success: true,
        message: "You have applied for the loan successfully.",
    });
});
exports.updateLoan = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.query;
    if (id && status) {
        const loan = await Loan_model_1.Loan.findById(id);
        if (!loan)
            return next(new utility_class_1.ErrorHandler("Loan does not exists.", 400));
        const receiverUser = await User_model_1.User.findOne({
            accountNumber: loan.accountNumber,
        });
        if (!receiverUser)
            return next(new utility_class_1.ErrorHandler("Can't find the user", 400));
        switch (status) {
            case "applied":
                loan.status = "applied";
                break;
            case "graunted":
                loan.status = "graunted";
                receiverUser.accountBalance += loan.loanAmount;
                await Transactions_model_1.Transaction.create({
                    amount: loan.loanAmount,
                    sender: 1234567890,
                    receiver: receiverUser.accountNumber,
                    type: "loan",
                });
                await receiverUser.save();
                break;
            case "declined":
                loan.status = "declined";
                break;
            case "paid":
                loan.status = "paid";
                break;
            default:
                loan.status = "paid";
                break;
        }
        await loan.save();
        res.status(200).json({
            success: true,
            message: "Loan has been updated.",
        });
    }
    else {
        return next(new utility_class_1.ErrorHandler("Fileds are missing", 400));
    }
});
exports.getAllLoanforUser = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber } = req.params;
    if (accountNumber) {
        const loans = await Loan_model_1.Loan.find({ accountNumber });
        if (!loans)
            return next(new utility_class_1.ErrorHandler("no loans exists", 400));
        return res.status(200).json({
            success: true,
            loans,
        });
    }
    else {
        return next(new utility_class_1.ErrorHandler("Fileds are missing", 400));
    }
});
exports.getAllLoans = (0, error_1.TryCatch)(async (req, res, next) => {
    const loans = await Loan_model_1.Loan.find({});
    if (!loans)
        return next(new utility_class_1.ErrorHandler("no loans exists", 400));
    return res.status(200).json({
        success: true,
        loans,
    });
});
exports.getLoanDetails = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        const loan = await Loan_model_1.Loan.findById(id);
        if (!loan)
            return next(new utility_class_1.ErrorHandler("Loan doesn't exists", 400));
        res.status(200).json({
            success: true,
            loan,
        });
    }
    else {
        return next(new utility_class_1.ErrorHandler("Fileds are missing", 400));
    }
});
