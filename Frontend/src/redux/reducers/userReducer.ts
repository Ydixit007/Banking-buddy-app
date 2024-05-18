import { MessageResponse } from "@/types/types";
import { userReducerInitialState } from "../types/reducer.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userReducerInitialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<MessageResponse>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userReducer.actions;
