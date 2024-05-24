import { MessageResponse, User } from "@/types/types";
import axios from "axios";

export const getUserData = async (accountNumber: number) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/user/getone/${accountNumber}`
  );
  const user: MessageResponse = res.data;
  return user;
};

export const storeNewUserData = (user: User) => {
  const newUser: MessageResponse = JSON.parse(
    localStorage.getItem("user") || ""
  );
  newUser.user = user;
  localStorage.setItem("user", JSON.stringify(newUser));
};
