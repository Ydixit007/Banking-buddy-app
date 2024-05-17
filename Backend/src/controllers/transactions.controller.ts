import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import {
  depositMoneyRequestBody,
  transerMoneyRequestBody,
} from "../types/types";
import { ErrorHandler } from "../utils/utility-class";
import { User } from "../models/User.model";
import { Transaction } from "../models/Transactions.model";

export const transferMoney = TryCatch(
  async (
    req: Request<{}, {}, transerMoneyRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { sender, receiver, amount } = req.body;
    if (!sender || !receiver || !amount)
      return next(new ErrorHandler("please fill all fields to proceed", 400));

    if (amount <= 0)
      return next(new ErrorHandler("Amount cannot be zero or negative", 500));

    const senderUser = await User.findOne({ accountNumber: sender });
    const receiverUser = await User.findOne({ accountNumber: receiver });

    if (!senderUser || !receiverUser)
      return next(new ErrorHandler("Can't find the user", 400));

    if (amount > senderUser.accountBalance)
      return next(new ErrorHandler("Enough account balance", 400));

    const transaction = await Transaction.create({
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
  }
);

export const depositMoney = TryCatch(
  async (
    req: Request<{}, {}, depositMoneyRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { accountNumber, amount } = req.body;
    if (!accountNumber || !amount)
      return next(new ErrorHandler("please fill all fields to proceed", 400));

    if (amount <= 0)
      return next(new ErrorHandler("Amount cannot be zero or negative", 500));

    const user = await User.findOne({ accountNumber });
    if (!user) return next(new ErrorHandler("Can't find the user", 400));

    const transaction = await Transaction.create({
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
  }
);
