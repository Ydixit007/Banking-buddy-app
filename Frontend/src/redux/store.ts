import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
});