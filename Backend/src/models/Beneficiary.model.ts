import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    ref: "User",
    required: true,
    unique: true,
  },
  maxLimit: {
    type: Number,
    default: 5000,
  },
  beneficiary: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Beneficiaries = mongoose.model("beneficiaries", schema);
