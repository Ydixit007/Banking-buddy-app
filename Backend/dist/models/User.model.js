"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const schema = new mongoose_1.default.Schema({
    fullName: { type: String, required: [true, "Please enter a your name"] },
    email: {
        type: String,
        required: [true, "Please enter a valid email Id"],
        unique: [true, "This email already exists"],
        validate: validator_1.default.default.isEmail,
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
}, {
    timestamps: true,
});
schema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() == dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
exports.User = mongoose_1.default.model("User", schema);
