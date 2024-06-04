"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beneficiaries_controller_1 = require("../controllers/beneficiaries.controller");
const beneficiariesRoute = express_1.default.Router();
beneficiariesRoute.post("/add", beneficiaries_controller_1.addBeneficiary);
beneficiariesRoute.get("/all", beneficiaries_controller_1.getAllUserBeneficiaries);
exports.default = beneficiariesRoute;
