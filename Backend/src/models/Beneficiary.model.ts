import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    ref: "User",
    required: true,
    unique: true,
  },
  beneficiaries: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
      required: true,
    },
  ],
});

export const Beneficiaries = mongoose.model("beneficiaries", schema);
