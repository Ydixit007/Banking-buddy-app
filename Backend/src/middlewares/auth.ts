import { NextFunction, Request, Response } from "express";
import { TryCatch } from "./error";
import { ErrorHandler } from "../utils/utility-class";
import { User } from "../models/User.model";

// middleware for admin access routes
export const adminOnly = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accountNumber } = req.query;
    if (!accountNumber)
      return next(
        new ErrorHandler("Please login first to access this route!", 401)
      );
    const user = await User.findOne({ accountNumber });
    if (!user) return next(new ErrorHandler("user not found", 404));
    if (user.role !== "admin")
      return next(new ErrorHandler("you do not have admin privilege", 401));
    next();
  }
);
