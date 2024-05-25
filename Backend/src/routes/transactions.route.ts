import express from "express";
import {
  depositMoney,
  getAllTransactions,
  getTransactions,
  transferMoney,
} from "../controllers/transactions.controller";
import { adminOnly } from "../middlewares/auth";

const transactionsRoute = express.Router();

transactionsRoute.post("/transfer", transferMoney);
transactionsRoute.post("/deposit", depositMoney);
transactionsRoute.get("/recent/:accountNumber", getTransactions);
// admin
transactionsRoute.get("/all",adminOnly, getAllTransactions);


export default transactionsRoute;
