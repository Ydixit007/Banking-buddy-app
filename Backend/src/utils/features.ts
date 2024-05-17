import mongoose from "mongoose";
import jwt from "jsonwebtoken"
export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {dbName: "banking-web-app"});
    console.log("database connected!");
  } catch (error) {
    console.log(error);
  }
};

export const verifyJwtToken = (token: string) =>{
  const key = process.env.JWT_SECRET || "";
  return jwt.verify(token , key);
}