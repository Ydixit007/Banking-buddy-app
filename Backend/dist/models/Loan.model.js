"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.Loan = mongoose_1.default.model("Loan", schema);
