import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobResponse, SingleJobResponse } from "../../types/Job";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Jobs", "Job", "Companies", "Company", "Users", "User"],
  endpoints: (builder) => ({
    getFeaturedJobs: builder.query<JobResponse, void>({
      query: () => "/",
    }),
    getAllJobs: builder.query<JobResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: "/jobs",
        params: { page, limit },
      }),
    }),
    getJobById: builder.query<SingleJobResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
      }),
    }),
  }),
});

export const { useGetFeaturedJobsQuery, useGetAllJobsQuery, useGetJobByIdQuery } = api;