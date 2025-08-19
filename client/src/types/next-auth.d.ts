// Extend NextAuth types to include custom user properties
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      userType: string;
      emailVerified: Date;
    } & DefaultSession["user"];
    expires: string;
  }
}
