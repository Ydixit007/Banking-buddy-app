import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Please enter a your name"] },
    email: {
      type: String,
      required: [true, "Please enter a valid email Id"],
      unique: [true, "This email already exists"],
      validate: validator.default.isEmail,
    },
    phone: {
      type: Number,
      required: [true, "Please enter a valid phone number"],
    },
    password: { type: String, required: [true, "Please enter password"] },
    address: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    accountNumber: {
      type: Number,
      required: [true, "invalid account number"],
      unique: [true, "invalid account number"],
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    dob: {
      type: Date,
      required: [true, "Please enter date of birth."],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model("User", schema);
