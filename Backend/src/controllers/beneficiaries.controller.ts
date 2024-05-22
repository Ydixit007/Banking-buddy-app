import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { addBeneficiariesRequestBody } from "../types/types";
import { ErrorHandler } from "../utils/utility-class";
import { User } from "../models/User.model";
import { Beneficiaries } from "../models/Beneficiary.model";

export const addBeneficiary = TryCatch(
  async (
    req: Request<{}, {}, addBeneficiariesRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { userAccountNumber, beneficiaryAccountNumber, maxLimit } = req.body;
    if (!userAccountNumber || !beneficiaryAccountNumber)
      return next(
        new ErrorHandler(
          "Incomplete data, Please add beneficiary and your correct details",
          400
        )
      );
    const beneficiaryAccount = await User.findOne({
      accountNumber: beneficiaryAccountNumber,
    });
    // checking if user exists
    if (!beneficiaryAccount)
      return next(new ErrorHandler("User doesn't exists", 400));

    const beneficiaryExists = await Beneficiaries.find({
      $and: [
        { accountNumber: userAccountNumber },
        { beneficiary: beneficiaryAccount._id },
      ],
    });
    if (!(beneficiaryExists.length > 0)) {
      // add if it doesn't exists
      await Beneficiaries.create({
        accountNumber: userAccountNumber,
        beneficiary: beneficiaryAccount._id,
        maxLimit,
      });

      return res.status(201).json({
        success: true,
        message: "Beneficiary Created",
      });
    } else {
      // return if already exists
      return res.status(200).json({
        success: true,
        message: "Beneficiary Already exists",
      });
    }
  }
);

export const getAllUserBeneficiaries = TryCatch(async (req, res, next) => {
  const { accountNumber } = req.query;
  if (!accountNumber)
    return next(
      new ErrorHandler(
        "Incomplete data, Please add beneficiary and your correct details",
        400
      )
    );
  const beneficiaries = await Beneficiaries.find({
    accountNumber,
  }).populate("beneficiary", ["fullName", "accountNumber", "phone"]);

  if (!beneficiaries)
    return next(new ErrorHandler("beneficiaries does not exists", 404));

  return res.status(200).json({
    success: true,
    beneficiaries,
  });
});
