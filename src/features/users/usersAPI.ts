// src/features/users/usersAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain"; // Ensure this file exists with your API base URL
import type { RootState } from "../../app/store";

export type TUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_phone?: string;
  address?: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
  image_url?: string; // Added to match UpdateProfile
};

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.query<TUser[], void>({
      query: () => "/auth/users",
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<TUser, Partial<TUser> & { user_id: number }>({
      query: (user) => ({
        url: `/auth/users/${user.user_id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserById: builder.query<TUser, number>({
      query: (user_id) => `/auth/users/${user_id}`,
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} = usersAPI;