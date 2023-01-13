import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const departmentApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/departments/",
    prepareHeaders,
  }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartmentList: builder.query({
      query: (body) => {
        const opts = {};
        if (body?.page) {
          opts.params = { page: body?.page, limit: 5 };
        }
        return {
          url: "",
          ...opts,
        };
      },
      providesTags: ["Department"],
    }),
    addDepartment: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: ({ _id, ...department }) => {
        return {
          url: _id,
          method: "PUT",
          body: department,
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error && [{ type: "Department", _id: result._id }],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentListQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
