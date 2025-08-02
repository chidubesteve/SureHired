"use client";

import { Header } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LuUser } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import {
  NameProfileInfoSection,
  PasswordProfileInfoSection,
} from "./components/ProfileInformation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import UserAppliedJobs from "./components/UserAppliedJobs";
import FollowedCompanies from "./components/FollowedCompanies";
import SavedJobs from "./components/SavedJobs";

interface UserProfileProps {
  userId: string;
  user: Session["user"];
}

const UserProfile = ({ userId, user }: UserProfileProps) => {


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Welcome, {user.firstName}!
        </h1>
        <p className="text-neutral-600">
          Manage your profile and track your job applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <LuUser className="w-6 h-6 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <NameProfileInfoSection userProps={user} />

              {/* Email Field (Read-only) */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <span className="text-neutral-600">{user.email}</span>
                </div>
              </div>

              {/* Password Field */}
              <PasswordProfileInfoSection userId={userId} />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Applied Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Applied Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {<UserAppliedJobs userId={userId} />}
              </div>
            </CardContent>
          </Card>

          {/* Followed Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Followed Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <FollowedCompanies userId={userId} />
            </CardContent>
          </Card>

          {/* Saved Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Saved Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {
                <SavedJobs userId={userId} />
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Updated page component (Server Component)
const Page = () => {
  const { data: session, status } = useSession();
  if (!session?.user) return null;
  const { user: sessionUser } = session;

  console.log("🚀 user from session", sessionUser);
  console.log("🚀 status", status);
  const userId = sessionUser.id;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <UserProfile user={sessionUser} userId={userId} />
    </div>
  );
};

export default Page;
