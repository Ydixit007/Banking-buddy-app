"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const features_1 = require("./utils/features");
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_1 = require("./middlewares/error");
const loan_route_1 = __importDefault(require("./routes/loan.route"));
const transactions_route_1 = __importDefault(require("./routes/transactions.route"));
const beneficiaries_route_1 = __importDefault(require("./routes/beneficiaries.route"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)({
    path: "./.env",
});
// app init
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/loan", loan_route_1.default);
app.use("/api/v1/transactions", transactions_route_1.default);
app.use("/api/v1/beneficiaries", beneficiaries_route_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to banking web app backend!");
});
// custom middleware
app.use(error_1.errorHandlerMiddleware);
app.listen(port, () => {
    console.log("App is now running!");
    (0, features_1.connectDB)(process.env.MONGODB_URI || "");
});
exports.default = app;
