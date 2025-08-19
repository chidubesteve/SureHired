/**
 * this slice is to fetch and update user data
 */
import { PublicUserResponse } from "@/types/User";
import {
  getUserApplicationsResponse,
  getUserBookmarksResponse,
  getUserFollowedCompaniesResponse,
} from "@/types/UserRelated";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
  }),
  tagTypes: ["Applications", "Bookmarks", "FollowedCompanies", "User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<PublicUserResponse, string>({
      query: (userId) => `/${userId}/profile`,
      providesTags: ["User"],
    }),

    getUserJobApplications: builder.query<
      getUserApplicationsResponse,
      { page: number; limit: number; userId: string }
    >({
      query: ({ userId, page, limit }) => ({
        url: `/${userId}/applications`,
        params: { page, limit },
      }),
      providesTags: ["Applications"],
    }),
    getUserBookmarks: builder.query<
      getUserBookmarksResponse,
      { page: number; limit: number; userId: string }
    >({
      query: ({ userId, page, limit }) => ({
        url: `/${userId}/bookmarks`,
        params: { page, limit },
      }),
      providesTags: ["Bookmarks"],
    }),
    getUserFollowedCompanies: builder.query<
      getUserFollowedCompaniesResponse,
      { page: number; limit: number; userId: string }
    >({
      query: ({ userId, page, limit }) => ({
        url: `/${userId}/followed-companies`,
        params: { page, limit },
      }),
      providesTags: ["FollowedCompanies"],
    }),
    updateUserPassword: builder.mutation<
      { success: boolean; message: string },
      { userId: string; currentPassword: string; newPassword: string }
    >({
      query: ({ userId, currentPassword, newPassword }) => ({
        url: `/change-password`,
        method: "PUT",
        body: { userId, currentPassword, newPassword },
      }),
      invalidatesTags: ["User"],
    }),
    changeUserFullName: builder.mutation<
      { success: boolean; message: string },
      { userId: string; firstName: string; lastName: string }
    >({
      query: (data) => ({
        url: `/change-name`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserJobApplicationsQuery,
  useGetUserBookmarksQuery,
  useGetUserProfileQuery,
  useGetUserFollowedCompaniesQuery,
  useUpdateUserPasswordMutation,
  useChangeUserFullNameMutation,
} = userApi;
