import express from "express";
import {
  createUser,
  getAllUsers,
  getUserFromDatabase,
  loginUser,
  verifyUserToken,
} from "../controllers/user.controller";
import { adminOnly } from "../middlewares/auth";

const userRoute = express.Router();

// create user
userRoute.post("/create", createUser);

// login user
userRoute.post("/login", loginUser);

// verify login
userRoute.post("/verify", verifyUserToken);

// get user (The id is account number)
userRoute.get("/getone/:id", getUserFromDatabase);

// get all the users
userRoute.get("/all", adminOnly, getAllUsers);

// update user
userRoute.put("/:id", adminOnly);

export default userRoute;
