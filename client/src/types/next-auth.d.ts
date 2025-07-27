// Extend NextAuth types to include custom user properties
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      userType?: string;
      profilePicture?: string | null;
    } & DefaultSession["user"];
    expires: string;
  }
}
