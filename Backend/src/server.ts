import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "./models/User.model";
import { generateToken, verifyToken } from "./utils/jwt";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb+srv://ydixit007:zovyVZuanezQAqgQ@banking-web-app.16aeyhj.mongodb.net/?retryWrites=true&w=majority&appName=banking-web-app",
  { dbName: "banking-app-data" }
);

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, MERN stack!");
});

// Register route
app.post("/api/register", async (req: Request, res: Response) => {
  const accountNumber = Math.floor(Math.random() * 10000000000);
  try {
    const user = await UserModel.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      accountNo: accountNumber,
    });
    res.json({ status: "ok", message: "User has been created." });
  } catch (error) {
    res.json({ status: "Failed", message: "Something went wrong!" });
  }
});

// Login route
app.post("/api/login", async (req: Request, res: Response) => {
  const userExists = await UserModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (userExists) {
    const token = generateToken(userExists.email);
    res.json({ status: "ok", message: "Login successful!", token: token });
  } else {
    res.json({ status: "Failed", message: "user not found!" });
  }
});

app.get("/verifytoken", (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const { email } = verifyToken(token as string);
    // Perform protected actions
    res.json({ status: "ok", message: "Access granted", email: email });
  } catch (error) {
    res.status(403).json({ error: "Failed to authenticate token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
