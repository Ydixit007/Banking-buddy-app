"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loan_controller_1 = require("../controllers/loan.controller");
const auth_1 = require("../middlewares/auth");
const loanRoute = express_1.default.Router();
// apply for the loan
loanRoute.post("/apply", loan_controller_1.applyNewLoan);
// update loan
loanRoute.put("/:id", auth_1.adminOnly, loan_controller_1.updateLoan);
// get loans for users
loanRoute.get("/all/:accountNumber", loan_controller_1.getAllLoanforUser);
// get single loan
loanRoute.get("/:id", loan_controller_1.getLoanDetails);
// admin route
loanRoute.get("/admin/all", auth_1.adminOnly, loan_controller_1.getAllLoans);
exports.default = loanRoute;
