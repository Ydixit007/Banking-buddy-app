import { MessageResponse } from "@/types/types";
import axios from "axios";

export const getUserData = async (accountNumber: number) => {
  const res = await axios.get(
    `http://localhost:3000/api/v1/user/getone/${accountNumber}`
  );
  const user: MessageResponse = res.data;
  return user;
};

export const storeNewUserData = (user: MessageResponse) => {
  localStorage.setItem("user", JSON.stringify(user));
};
