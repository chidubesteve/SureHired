import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobResponse, SingleJobResponse } from "../../types/Job";


export const jobsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "jobsApi",
  tagTypes: ["Jobs", "Job"],
  endpoints: (builder) => ({
    getFeaturedJobs: builder.query<JobResponse, void>({
      query: () => "/",
    }),
    getAllJobs: builder.query<JobResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: "/jobs",
        params: { page, limit },
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query<SingleJobResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Job", id }],
      // Invalidates the cache for the job when it is updated or deleted
    }),
  }),
});

export const { useGetFeaturedJobsQuery, useGetAllJobsQuery, useGetJobByIdQuery,  } = jobsApi;