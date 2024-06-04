"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
const userRoute = express_1.default.Router();
// create user
userRoute.post("/create", user_controller_1.createUser);
// login user
userRoute.post("/login", user_controller_1.loginUser);
// verify login
userRoute.post("/verify", user_controller_1.verifyUserToken);
// update user
userRoute.post("/update", user_controller_1.updateUser);
// get user (The id is account number)
userRoute.get("/getone/:id", user_controller_1.getUserFromDatabase);
// get all the users
userRoute.get("/all", auth_1.adminOnly, user_controller_1.getAllUsers);
// update user
userRoute.put("/:id", auth_1.adminOnly);
exports.default = userRoute;
