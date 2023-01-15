import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/auth/",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["CurrentUser"],
  endpoints: (builder) => ({
    user: builder.query({
      query: () => {
        return { url: "me", method: "GET" };
      },
      providesTags: ["CurrentUser"],
    }),
    login: builder.mutation({
      query: (post) => {
        return {
          url: "/login",
          method: "POST",
          body: post,
        };
      },
      invalidatesTags: ["CurrentUser"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET", // remove cookie and Auth token from browser session
      }),
    }),
  }),
});

export const {
  useUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
