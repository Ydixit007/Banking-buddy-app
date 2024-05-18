import express from "express";
import { depositMoney, transferMoney } from "../controllers/transactions.controller";

const transactionsRoute = express.Router();

transactionsRoute.post("/transfer", transferMoney);
transactionsRoute.post("/deposit", depositMoney);

export default transactionsRoute;
