export interface User {
  fullName: string;
  email: string;
  address: string;
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
  success: boolean,
  message: string,
}