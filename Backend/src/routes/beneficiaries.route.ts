import express from "express"
import { addBeneficiary, getAllUserBeneficiaries } from "../controllers/beneficiaries.controller";

const beneficiariesRoute = express.Router();

beneficiariesRoute.post("/add", addBeneficiary);
beneficiariesRoute.get("/all", getAllUserBeneficiaries);


export default beneficiariesRoute;