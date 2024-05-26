export interface User {
  fullName: string;
  email: string;
  address: string;
  phone: number;
  role: string;
  accountNumber: number;
  accountBalance: number;
  dob: string;
  _id: string;
}

export type MessageResponse = {
  success: boolean;
  user: User;
  token: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type LoginCreds = {
  email: string;
  password: string;
};

export type MessageApiResponse = {
  success: boolean;
  message: string;
};

export type BeneficiaryType = {
  fullName: string;
  accountNumber: number;
  phone: number;
  maxLimit: number;
};

export type BeneficiariesResponse = {
  accountNumber: number;
  maxLimit: number;
  beneficiary: BeneficiaryType;
};

export type Transaction = {
  _id: string;
  sender: number;
  receiver: number;
  type: string;
  amount: number;
  createdAt: Date;
};

export type TransactionResponse = {
  success: boolean;
  transactions: Transaction[];
  total?: number,
};

export type Loan = {
  accountNumber: number;
  status: string;
  loanAmount: number;
  dueDate: Date;
  appliedOn: Date;
  _id: string
};

export type LoanResponse = {
  success: boolean;
  loans: [Loan];
};

export interface CustomerApiResponse {
  success: boolean;
  users: User[];
}