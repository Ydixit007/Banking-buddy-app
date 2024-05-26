import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { applyLoanRequestBody } from "../types/types";
import { ErrorHandler } from "../utils/utility-class";
import { Loan } from "../models/Loan.model";
import { transferMoney } from "./transactions.controller";
import { User } from "../models/User.model";
import { Transaction } from "../models/Transactions.model";

export const applyNewLoan = TryCatch(
  async (
    req: Request<{}, {}, applyLoanRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { accountNumber, loanAmount, dueDate } = req.body;
    if (!accountNumber || !loanAmount || !dueDate)
      return next(new ErrorHandler("Fileds are missing", 400));

    const loan = Loan.create({
      accountNumber,
      loanAmount,
      appliedOn: Date.now(),
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "You have applied for the loan successfully.",
    });
  }
);

export const updateLoan = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;
  if (id && status) {
    const loan = await Loan.findById(id);
    if (!loan) return next(new ErrorHandler("Loan does not exists.", 400));

    const receiverUser = await User.findOne({
      accountNumber: loan.accountNumber,
    });

    if (!receiverUser)
      return next(new ErrorHandler("Can't find the user", 400));

    switch (status) {
      case "applied":
        loan.status = "applied";
        break;

      case "graunted":
        loan.status = "graunted";
        receiverUser.accountBalance += loan.loanAmount;
        await Transaction.create({
          amount: loan.loanAmount,
          sender: 1234567890,
          receiver: receiverUser.accountNumber,
          type: "loan",
        })
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
  } else {
    return next(new ErrorHandler("Fileds are missing", 400));
  }
});

export const getAllLoanforUser = TryCatch(async (req, res, next) => {
  const { accountNumber } = req.params;
  if (accountNumber) {
    const loans = await Loan.find({ accountNumber });

    if (!loans) return next(new ErrorHandler("no loans exists", 400));

    return res.status(200).json({
      success: true,
      loans,
    });
  } else {
    return next(new ErrorHandler("Fileds are missing", 400));
  }
});

export const getAllLoans = TryCatch(async (req, res, next) => {
  const loans = await Loan.find({});

  if (!loans) return next(new ErrorHandler("no loans exists", 400));

  return res.status(200).json({
    success: true,
    loans,
  });
});

export const getLoanDetails = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const loan = await Loan.findById(id);
    if (!loan) return next(new ErrorHandler("Loan doesn't exists", 400));

    res.status(200).json({
      success: true,
      loan,
    });
  } else {
    return next(new ErrorHandler("Fileds are missing", 400));
  }
});
