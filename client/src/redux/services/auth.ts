import { FormSchemaType } from "@/app/auth/sign-up/validationSchema";
import { SignUpResponse } from "@/types/Auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, FormSchemaType>({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const { useSignUpMutation } = authApi;
