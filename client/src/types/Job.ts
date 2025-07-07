export interface Job {
  id: string;
  title: string;
  description: string;
  type: string;
  salary: string;
  location: string[];
  tags: string[];
  requirements: string[];
  benefits: string[];
  applicationMethod: "In_app" | "External";
  isFeatured: boolean;
  postedDate: string; // ISO string, from backend DateTime
  status: "Open" | "Closed";
  updatedAt: string; // ISO string
  applicationUrl?: string | null;

  company: {
    id: string;
    name: string;
    logo?: string | null;
  };

  applicationQuestions?: {
    id: string;
    question: string;
    type: "textarea" | "select" | "radio" | "checkbox";
    required: boolean;
    options: string[];
  }[];
}
export interface JobResponse {
  success: boolean;
  message: string;
  data: Job[];
  pagination?: {
    totalJobs: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
