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

    const beneficiary = await User.findOne({
      accountNumber: beneficiaryAccountNumber,
    });
    if (!beneficiary)
      return next(new ErrorHandler("beneficiary does not exists", 404));

    const beneficiaries = await Beneficiaries.findOne({
      accountNumber: userAccountNumber,
    });
    if (beneficiaries) {
      // beneficiaries.beneficiaries.push(beneficiary._id);
      // await beneficiaries.save();
    } else {
      const userBeneficiaries = [];
      userBeneficiaries.push(beneficiary);
      await Beneficiaries.create({
        accountNumber: userAccountNumber,
        beneficiary: beneficiary.id,
        maxLimit,
      });

      return res.status(201).json({
        success: true,
        message: "Beneficiary added."
      })
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
  const beneficiaries = await Beneficiaries.findOne({
    accountNumber,
  }).populate("beneficiaries", ["fullName", "accountNumber", "phone"]);
  if (!beneficiaries)
    return next(new ErrorHandler("beneficiaries does not exists", 404));

  res.status(200).json({
    success: true,
    beneficiaries,
  });
});
