import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (email: string): string => {
  const options: SignOptions = {
    expiresIn: "1h",
  };
  return jwt.sign({ email: email }, "secret134", options);
};

export const verifyToken = (token: string): { email: string } => {
  return jwt.verify(token, "secret134") as {
    email: string;
  };
};
