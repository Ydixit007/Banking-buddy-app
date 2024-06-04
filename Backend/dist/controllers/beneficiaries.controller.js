"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserBeneficiaries = exports.addBeneficiary = void 0;
const error_1 = require("../middlewares/error");
const utility_class_1 = require("../utils/utility-class");
const User_model_1 = require("../models/User.model");
const Beneficiary_model_1 = require("../models/Beneficiary.model");
exports.addBeneficiary = (0, error_1.TryCatch)(async (req, res, next) => {
    const { userAccountNumber, beneficiaryAccountNumber, maxLimit } = req.body;
    if (!userAccountNumber || !beneficiaryAccountNumber)
        return next(new utility_class_1.ErrorHandler("Incomplete data, Please add beneficiary and your correct details", 400));
    const beneficiaryAccount = await User_model_1.User.findOne({
        accountNumber: beneficiaryAccountNumber,
    });
    // checking if user exists
    if (!beneficiaryAccount)
        return next(new utility_class_1.ErrorHandler("User doesn't exists", 400));
    const beneficiaryExists = await Beneficiary_model_1.Beneficiaries.find({
        $and: [
            { accountNumber: userAccountNumber },
            { beneficiary: beneficiaryAccount._id },
        ],
    });
    if (!(beneficiaryExists.length > 0)) {
        // add if it doesn't exists
        await Beneficiary_model_1.Beneficiaries.create({
            accountNumber: userAccountNumber,
            beneficiary: beneficiaryAccount._id,
            maxLimit,
        });
        return res.status(201).json({
            success: true,
            message: "Beneficiary Created",
        });
    }
    else {
        // return if already exists
        return res.status(200).json({
            success: true,
            message: "Beneficiary Already exists",
        });
    }
});
exports.getAllUserBeneficiaries = (0, error_1.TryCatch)(async (req, res, next) => {
    const { accountNumber } = req.query;
    if (!accountNumber)
        return next(new utility_class_1.ErrorHandler("Incomplete data, Please add beneficiary and your correct details", 400));
    const beneficiaries = await Beneficiary_model_1.Beneficiaries.find({
        accountNumber,
    }).populate("beneficiary", ["fullName", "accountNumber", "phone"]);
    if (!beneficiaries)
        return next(new utility_class_1.ErrorHandler("beneficiaries does not exists", 404));
    return res.status(200).json({
        success: true,
        beneficiaries,
    });
});
