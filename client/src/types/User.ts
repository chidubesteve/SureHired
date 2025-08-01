export type UserType = "CANDIDATE" | "EMPLOYER";

export interface PublicUser {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string | null;
    userType: UserType;
    emailVerified: Date;
    rememberMe?: boolean;
    companyId?: string; // Optional, only for EMPLOYER type
  };
}
