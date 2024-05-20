import express from "express";
import {
  depositMoney,
  getTransactions,
  transferMoney,
} from "../controllers/transactions.controller";

const transactionsRoute = express.Router();

transactionsRoute.post("/transfer", transferMoney);
transactionsRoute.post("/deposit", depositMoney);
transactionsRoute.get("/recent/:accountNumber", getTransactions);

export default transactionsRoute;
