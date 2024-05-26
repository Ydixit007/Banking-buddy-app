import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    sender: {
      type: Number,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Number,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit","transfer", "loan"],
      default: "deposit",
    },
    amount: {
      type: Number,
      requred: [true, "Require an amount for transaction"],
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", schema);
