import { NextFunction, Request, Response } from "express";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface createUserRequestBody {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  photo: string;
  gender: string;
  dob: Date;
}

export interface loginUserRequestBody {
  email: string;
  password: string;
}

export interface applyLoanRequestBody {
  accountNumber: number;
  loanAmount: number;
  status?: string;
  dueDate: Date;
  appliedOn: Date;
  paidOn?: Date;
}

export interface updateLoanRequestBody {
  accountNumber: number;
  status?: string;
}

export interface updateUserRequestBody {
  fullName?: string;
  phone?: number;
  accountNumber: Number;
  address?: string;
}

export interface transerMoneyRequestBody {
  sender: number;
  receiver: number;
  amount: number;
}

export interface depositMoneyRequestBody{
  accountNumber: number,
  amount: number, 
}

export interface addBeneficiariesRequestBody{
  userAccountNumber: number,
  beneficiaryAccountNumber: number, 
}
