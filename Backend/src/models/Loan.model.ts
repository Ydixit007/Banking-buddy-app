import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    accountNumber: { type: Number, required: true },
    loanAmount: {
      type: Number,
      required: [true, "Please enter a loan amount"],
    },
    status: {
      type: String,
      enum: ["applied", "graunted", "paid", "declined"],
      default: "applied",
    },
    dueDate: { type: Date, required: [true, "Please select a due date"] },
    appliedOn: { type: Date, required: [true, "Please select a due date"] },
    paidOn: { type: Date },
  },
  { timestamps: true }
);

export const Loan = mongoose.model("Loan", schema);
