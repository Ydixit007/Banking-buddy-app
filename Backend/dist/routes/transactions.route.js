"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactions_controller_1 = require("../controllers/transactions.controller");
const auth_1 = require("../middlewares/auth");
const transactionsRoute = express_1.default.Router();
transactionsRoute.post("/transfer", transactions_controller_1.transferMoney);
transactionsRoute.post("/deposit", transactions_controller_1.depositMoney);
transactionsRoute.get("/recent/:accountNumber", transactions_controller_1.getTransactions);
// admin
transactionsRoute.get("/all", auth_1.adminOnly, transactions_controller_1.getAllTransactions);
exports.default = transactionsRoute;
