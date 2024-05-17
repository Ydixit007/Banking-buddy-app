import express from "express"
import { applyNewLoan, getAllLoanforUser, getLoanDetails, updateLoan } from "../controllers/loan.controller";
import { adminOnly } from "../middlewares/auth";

const loanRoute = express.Router();

// apply for the loan
loanRoute.post("/apply", applyNewLoan);

// update loan
loanRoute.put("/:id", adminOnly, updateLoan);

// get loans for users
loanRoute.get("/all/:accountNumber", getAllLoanforUser);

// get single loan
loanRoute.get("/:id", getLoanDetails);

export default loanRoute;