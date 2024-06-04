"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connectDB = async (uri) => {
    try {
        await mongoose_1.default.connect(uri, { dbName: "banking-web-app" });
        console.log("database connected!");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDB = connectDB;
const verifyJwtToken = (token) => {
    const key = process.env.JWT_SECRET || "";
    return jsonwebtoken_1.default.verify(token, key);
};
exports.verifyJwtToken = verifyJwtToken;
