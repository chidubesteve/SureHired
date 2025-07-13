import { GetCompaniesQueryArgs, GetCompaniesResponse, SingleCompanyResponse } from "@/types/Company";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type QueryValue = string | number | boolean | undefined;
export const companyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "companiesApi",
  tagTypes: ["Companies", "Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query<GetCompaniesResponse, GetCompaniesQueryArgs>(
      {
        query: (params) => {
          const filteredParams: Record<string, QueryValue> = {};

          filteredParams.page = params.page || 1;
          filteredParams.limit = params.limit || 9;

          // only include params that are defined
          if (params.search && params.search.trim() !== "") {
            filteredParams.search = params.search.trim();
          }

          if (params.industry && params.industry.trim() !== "") {
            filteredParams.industry = params.industry.trim();
          }

          if (params.size && params.size.trim() !== "") {
            filteredParams.size = params.size.trim();
          }

          if (params.workStyle && params.workStyle.trim() !== "") {
            filteredParams.workStyle = params.workStyle.trim();
          }
          return {
            url: "/companies",
            params: filteredParams,
          };
        },

        providesTags: ["Companies"],
      }
    ),
    getCompanyById: builder.query<SingleCompanyResponse, string>({
      query: (id) => ({
        url: `/companies/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Company", id }],
    }),
  }),
});

export const { useGetAllCompaniesQuery, useGetCompanyByIdQuery } = companyApi;
