import { config } from "dotenv";
import express from "express";
import { connectDB } from "./utils/features";
import userRoute from "./routes/user.route";
import { errorHandlerMiddleware } from "./middlewares/error";
import loanRoute from "./routes/loan.route";
import transactionsRoute from "./routes/transactions.route";
import beneficiariesRoute from "./routes/beneficiaries.route";
import cros from "cors";

config({
  path: "./.env",
});

// app init
const app = express();
const port = process.env.PORT || 3000;
// middlewares
app.use(express.json());
app.use(cros());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/loan", loanRoute);
app.use("/api/v1/transactions", transactionsRoute);
app.use("/api/v1/beneficiaries", beneficiariesRoute);

app.get("/", (req, res) => {
  res.send("Welcome to banking web app backend!");
});

// custom middleware
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("App is now running!");
  connectDB(process.env.MONGODB_URI || "");
});

export default app