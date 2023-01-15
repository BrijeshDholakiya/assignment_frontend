import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "../redux/slices/authSlice";

export const baseQueryWithAuthInterceptor = (args) => {
  const baseQuery = fetchBaseQuery(args);
  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) api.dispatch(setCurrentUser(null));

    return result;
  };
};

export const prepareHeaders = (headers, { getState }) => {
  console.log("headers >>>>> ", headers, getState());
  const token = getState()?.auth?.token || localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  console.log("headers >>>>> ", headers);
  return headers;
};
