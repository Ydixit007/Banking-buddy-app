import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountNo: { type: Number, required: true, unique: true },
  },
  { collection: "user-data" }
);

export const UserModel = mongoose.model("UserData", User);
