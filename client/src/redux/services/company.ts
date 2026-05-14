import {
  createCompanyArgs,
  createCompanyResponse,
  GetCompaniesQueryArgs,
  GetCompaniesResponse,
  SingleCompanyResponse,
} from "@/types/Company";
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
    createCompany: builder.mutation<createCompanyResponse, createCompanyArgs>({
      query: ({ userId, data }) => {
        const formData = new FormData();
        // Append text fields to the FormData object
        Object.entries(data).forEach(([key, value]) => {
          if (key !== "logo") {
            if (typeof value === "number") {
              formData.append(key, value.toString());
            } else if (Array.isArray(value)) {
              formData.append(key, JSON.stringify(value));
            } else if (typeof value === "object" && value !== null) {
              formData.append(key, JSON.stringify(value));
            } else if (typeof value === "string") {
              formData.append(key, value);
            }
          }
        });
        // Append the logo file if it exists
        if (data.logo) {
          formData.append("logo", data.logo);
        }
        return {
          url: `/company/create/${userId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation<
      SingleCompanyResponse,
      { id: string; data: Partial<createCompanyArgs> }
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

        // Append text fields to the FormData object
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            if (key === "logo") {
              //append the file
              if (value instanceof File) {
                formData.append("logo", value);
                console.log("Appending logo file to FormData:", value);
              } else {
                console.log("Logo is not a File instance, skipping append:", value);
              }
            } else if (key !== "logo") {
              if (typeof value === "number") {
                formData.append(key, value);
              } else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
              } else if (typeof value === "object" && value !== null) {
                formData.append(key, JSON.stringify(value)); 
              } else if (typeof value === "string") {
                formData.append(key, value);
              }
            }
          }
        });
        return {
          url: `/company/update/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Company", id }],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} = companyApi;
