/**
 * Auth.js v5 configuration using:
 * - Database session strategy
 * - Prisma adapter
 * - Credentials + Google + LinkedIn providers
 *
 * Supports manual session handling for `credentials` sign-in, including "Remember Me".
 *
 * Uses:
 * - NextAuth (Auth.js v5)
 * - App Router (Next.js 15+)
 * - Prisma adapter for DB syncing
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/api/auth/prisma/prisma";
import { cookies } from "next/headers";
import { UserTypes } from "@prisma/client";
import { PublicUser } from "@/types/User";
import { randomUUID } from "crypto";

/**
 * Generates a UUID to be used as a session token.
 * Required for manually creating sessions (for credential-based auth).
 */
const generateSessionToken = () => randomUUID();

/**
 * Returns a Date object that is `days` days in the future.
 * Used to calculate session expiry.
 */
const fromDate = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export const { handlers, signIn, signOut, auth } = NextAuth({
  /**
   * Prisma adapter connects Auth.js to our PostgreSQL DB.
   * Required when using the database strategy (not JWT).
   */
  adapter: PrismaAdapter(prisma),
  /**
   * Secret for encrypting session tokens (only used internally for validation).
   */
  secret: process.env.AUTH_SECRET,
  /**
   * We use the `database` session strategy here, meaning:
   * - All sessions are stored in the `Session` table
   * - Useful for server-side lookups and "Remember Me" functionality
   *
   * ⚠️ Alternatives:
   * - `jwt` strategy: lighter, no DB writes, good for stateless apps
   */
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },

  /**
   * Authentication providers — credentials, Google, and LinkedIn.
   */
  providers: [
    /**
     * Credentials provider for email/password login.
     * Calls internal API route (`/auth/sign-in`) to validate users.
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sign-in`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              userType: credentials.userType,
              rememberMe: credentials.rememberMe,
            }),
          }
        );

        const { data: user, message } = await res.json();
        if (!res.ok) throw new Error(message || "Login failed");

        if (!user) {
          console.error("No user data returned from API");
          return null;
        }
        return { ...user, rememberMe: credentials.rememberMe === "true" };
      },
    }),
    GoogleProvider({
      /**
       * Google OAuth provider.
       * allowDangerousEmailAccountLinking is disabled by default for safety.
       */
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name || "",
          lastName: profile.family_name || "",
          profilePicture: profile.picture,
          email: profile.email,
          emailVerified: new Date(),
        };
      },
    }),
    LinkedInProvider({
      /**
       * LinkedIn OAuth provider.
       * Similar structure to Google.
       */
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          firstName: profile.given_name || profile.name.split(" ")[0] || "",
          lastName: profile.family_name || profile.name.split(" ")[1] || "",
          profilePicture:
            profile.picture ||
            `https://api.dicebear.com/9.x/adventurer/svg?seed=${
              profile.given_name || profile.email
            } `,
          email: profile.email,
          userType: "CANDIDATE",
          emailVerified: new Date(),
        };
      },
    }),
  ],
  /**
   * JWT is still used for edge-compatibility even in database mode.
   * Here, we override encode/decode to use `sessionId` as the token value.
   *
   * Alternative: You can omit this for OAuth-only setups.
   */
  jwt: {
    async encode({ token }) {
      return token!.sessionId as string;
    },
    async decode({ token }) {
      return { sessionId: token };
    },
  },
  /**
   * Callback handlers for extending behavior.
   */
  callbacks: {
    /**
     * Called on sign-in.
     * - For OAuth: creates or links users
     * - For Credentials: handles "Remember Me" and creates session manually
     */
    async signIn({ user, account, profile, credentials }) {
      console.log("User: ", user);
      console.log("Account: ", account);
      console.log("Profile: ", profile);
      console.log("Credentials: ", credentials);
      try {
        const cookieStore = await cookies();

        const userType = cookieStore.get("userType")?.value || "CANDIDATE";
        if (account?.provider !== "credentials") {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            const firstName =
              (user as PublicUser).firstName || user.name?.split(" ")[0] || "";
            const lastName =
              (user as PublicUser).lastName || user.name?.split(" ")[1] || "";

            if (!firstName.trim()) {
              console.error("Missing firstName for OAuth user");
              throw new Error(
                "Unable to get your name from the provider. Please try signing up manually."
              );
            }
            // create user for OAuth sign-in
            const newUser = await prisma.user.create({
              data: {
                firstName,
                lastName,
                email: user.email || "",
                profilePicture:
                  user.image ||
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (user as any).profilePicture ||
                  `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.email}`,
                userType: userType as UserTypes,
                emailVerified: (user as PublicUser).emailVerified || new Date(),
              },
            });
            // update user object with database user
            user.id = newUser.id;
            (user as PublicUser).firstName = newUser.firstName;
            (user as PublicUser).lastName = newUser.lastName;
            (user as PublicUser).userType = newUser.userType;
            (user as PublicUser).profilePicture = newUser.profilePicture;
          } else {
            // Check if user has an account with this provider already
            const existingAccount = await prisma.account.findFirst({
              where: {
                userId: existingUser.id,
                provider: account!.provider,
              },
            });

            if (!existingAccount) {
              // User exists but doesn't have this OAuth provider linked
              // You can either:
              // 1. Throw an error to prevent linking (current behavior)

              throw new Error(
                `An account with this email already exists. Please sign in with your original method or contact support.`
              );
            }
            // Update user object with existing user data
            user.id = existingUser.id;
            (user as PublicUser).firstName = existingUser.firstName;
            (user as PublicUser).lastName = existingUser.lastName;
            (user as PublicUser).userType = existingUser.userType;
            (user as PublicUser).profilePicture = existingUser.profilePicture;
          }
        }
        return true;
      } catch (error) {
        console.error("Sign-in callback error from oauth: ", error);
        return false;
      }
    },

    /**
     * Attach extra user info to the session object.
     * Required for accessing role, firstName, profilePicture, etc.
     */
    async session({ session, token, user }) {
      console.log("Session: ", session);
      console.log("Token: ", token);
      console.log("User: ", user);
      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          firstName: (user as PublicUser).firstName,
          lastName: (user as PublicUser).lastName,
          userType: (user as PublicUser).userType,
          profilePicture: (user as PublicUser).profilePicture,
        };
      }
      return session;
    },

    /**
     * Manually creates sessions for credentials logins.
     * Automatically sets expiration based on `rememberMe`.
     *
     * ⚠️ Required only for `database` strategy + `credentials` provider.
     */
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user?.id) {
        const sessionToken = generateSessionToken();
        const days = (user as PublicUser).rememberMe ? 30 : 1;
        const expires = fromDate(days);

        await PrismaAdapter(prisma).createSession!({
          sessionToken,
          userId: user.id,
          expires,
        });

        token.sessionId = sessionToken;
      }

      return token;
    },
  },
  /**
   * Custom Auth.js pages.
   */
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  /**
   * Logs additional output in development for debugging.
   */
  debug: process.env.NODE_ENV === "development",
});
