"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
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
        enum: ["deposit", "transfer", "loan"],
        default: "deposit",
    },
    amount: {
        type: Number,
        requred: [true, "Require an amount for transaction"],
    },
}, {
    timestamps: true,
});
exports.Transaction = mongoose_1.default.model("Transaction", schema);
