import { LoginCreds, MessageResponse } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_BASE_URL}/user`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, LoginCreds>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    create: builder.mutation<MessageResponse, LoginCreds>({
      query: (credentials) => ({
        url: "create",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;
