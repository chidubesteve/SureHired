// The shape Prisma/DB returns (includes relation fields)
export interface CompanySocialsDB {
  id: string;
  companyId: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  other?: string;
}

// shape sent to the API
export interface CompanySocialsInput {
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  other?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: File | string;
  description?: string;
  hqLocation: string;
  industry: string;
  size: string;
  founded: number;
  values?: string[];
  website?: string;
  mission?: string;
  offices?: {
    id: string;
    name: string;
    location: string;
    isHeadquarters: boolean;
    address: string;
    companyId: string;
  }[];
  socials?: CompanySocialsDB;
  jobs?: {
    id: string;
    title: string;
    type: string;
    location: string;
    salary: string;
    postedDate: string;
    status: string;
  }[];
  followers?: {
    userId: string;
    companyId: string;
  }[];

  benefits?: string[];
  workStyle?: "Remote" | "Hybrid" | "Onsite"; // Remote, Hybrid, Onsite
  tags: string[];
  _count: {
    jobs: number; // Prisma returns number of matching jobs
  };
}

export interface GetCompaniesResponse {
  success: boolean;
  message: string;
  data: Company[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCompanies: number;
  };
}

export interface GetCompaniesQueryArgs {
  page?: number;
  limit?: number;
  search?: string;
  industry?: string;
  size?: string;
  workStyle?: string;
}

export interface SingleCompanyResponse {
  success: boolean;
  message: string;
  data: Company;
}

export interface createCompanyArgs {
  userId: string;
  data: {
    name: string;
    logo?: File | string; // can be a File object or a URL string
    description: string;
    hqLocation: string;
    industry: string;
    size: string;
    founded: number;
    values?: string[];
    website: string;
    mission: string;
    benefits?: string[];
    workStyle?: string; // Remote, Hybrid, Onsite
    tags: string[];
    offices?: {
      address: string;
      isHeadquarters: boolean;
      location: string;
    }[];
    socials?: CompanySocialsInput;
  };
}

export interface createCompanyResponse {
  success: boolean;
  message: string;
  error?: string;
}
