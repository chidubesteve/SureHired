import { Company } from "./Company";
import { Job } from "./Job";

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "Applied" | "Interviewing" | "Rejected" | "Hired" | "Withdrawn";
  appliedAt: string;
  updatedAt: string;
  job: Job; // populated from `include: { job: true }`
}

export interface Bookmark {
  id: string;
  userId: string;
  jobId: string;
  savedAt: string;
  job: Job;
  company: Company;
}

export interface FollowedCompany {
  id: string;
  userId: string;
  companyId: string;
  followedAt: string;
  company: Company;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type getUserApplicationsResponse = PaginatedResponse<Application>;
export type getUserBookmarksResponse = PaginatedResponse<Bookmark>;
export type getUserFollowedCompaniesResponse =
  PaginatedResponse<FollowedCompany>;
