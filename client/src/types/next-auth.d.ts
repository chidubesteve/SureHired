// Extend NextAuth types to include custom user properties
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      email: string;
      userType?: string;
    } & DefaultSession["user"];
    expires: string;
  }
}
