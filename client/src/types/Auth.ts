export interface SignUpResponse {
  success: boolean;
  message: string;
    data: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePicture?: string | null;
      userType: string;
      emailVerified: Date;
      companyId?: string;
  };
  error?: string;
}

