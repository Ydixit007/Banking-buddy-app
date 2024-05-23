import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility-class.js";
import { User } from "../models/User.model.js";
import {
  createUserRequestBody,
  loginUserRequestBody,
  updateUserRequestBody,
} from "../types/types.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyJwtToken } from "../utils/features.js";

export const createUser = TryCatch(
  async (
    req: Request<{}, {}, createUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { fullName, address, dob, email, gender, password, phone, photo } =
      req.body;

    if (
      !fullName ||
      !address ||
      !dob ||
      !email ||
      !gender ||
      !password ||
      !phone ||
      !photo
    )
      return next(
        new ErrorHandler(
          "Input fields missing, Please add all fields to continue",
          400
        )
      );

    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        message: `welcome back, ${user.fullName}`,
      });
    }

    const accountNumber = Math.round(Math.random() * 10000000000);
    const encryptedPassword = await bcryptjs.hash(password, 10);

    user = await User.create({
      fullName,
      address,
      dob: new Date(dob),
      email,
      password: encryptedPassword,
      phone,
      accountNumber,
    });
    if (!user) return next(new ErrorHandler("User creation failed", 500));

    res.status(201).json({
      success: true,
      message: "user has been created",
    });
  }
);

export const loginUser = TryCatch(
  async (
    req: Request<{}, {}, loginUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Email or password missing", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("user does not exists", 404));
    const passwordCorrect = await bcryptjs.compare(password, user.password);
    if (passwordCorrect) {
      user.password = "";
      const key = process.env.JWT_SECRET || "";
      const token = jwt.sign({ email: email }, key, { expiresIn: "300s" });
      res.status(200).json({
        success: true,
        user,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
  }
);

export const verifyUserToken = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const user = verifyJwtToken(token);
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const getUserFromDatabase = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const user = await User.findOne({ accountNumber: id });
    if (!user)
      return next(
        new ErrorHandler("Account number does not exists", 400)
      );

    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(
      new ErrorHandler("Incorrect / account number does not exists", 400)
    );
  }
});

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  if (!users)
    return next(
      new ErrorHandler("something went wrong, users does not exists", 404)
    );

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUser = TryCatch(
  async (
    req: Request<{}, {}, updateUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { fullName, address, phone, accountNumber } = req.body;
    if (accountNumber) {
      const user = await User.findOne({ accountNumber });
      if (!user) return next(new ErrorHandler("user does not exists", 404));

      if (fullName) user.fullName = fullName;
      if (address) user.address = address;
      if (phone) user.phone = phone;

      await user.save();
      res.status(200).json({
        success: true,
        message: "User has been updated successfully.",
      });
    } else {
      return next(new ErrorHandler("account number missing", 400));
    }
  }
);
