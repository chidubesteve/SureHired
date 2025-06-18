import { Header } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LuUser } from "react-icons/lu";
import { Users } from "@/data/User";
import { Label } from "@/components/ui/label";
import {
  NameProfileInfoSection,
  PasswordProfileInfoSection,
} from "./components/ProfileInformation";

import { Applications } from "@/data/Application";
import { Jobs } from "@/data/Job";
import UserAppliedJobs from "./components/UserAppliedJobs";
import FollowedCompanies from "./components/FollowedCompanies";
import { Companies } from "@/data/Company";
import SavedJobs from "./components/SavedJobs";

const page = () => {
  const user = Users[0];
  const userId = user.id; // Dynamic user ID

  const userApplications = Applications.filter((application) =>
    user.applications.includes(application.id)
  );

  //  Map those applications to their related jobs
  const appliedJobs = userApplications
    .map((application) => Jobs.find((job) => job.id === application.jobId))
    .filter((job) => job !== undefined) as typeof Jobs;

  const followingCompanies = user.followingCompanies
    .map((companyId) => Companies.find((company) => companyId === company.id))
    .filter((company) => company !== undefined) as typeof Companies;

  const savedJobs = user.bookmarks
    .map((jobId) => Jobs.find((job) => job.id === jobId))
    .filter((job) => job !== undefined) as typeof Jobs;

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

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
                <NameProfileInfoSection user={user} />

                {/* Email Field (Read-only) */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="mt-1">
                    <span className="text-neutral-600">{user.email}</span>
                  </div>
                </div>

                {/* Password Field */}
                <PasswordProfileInfoSection email={user.email} />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Applied Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Applied Jobs ({appliedJobs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <UserAppliedJobs
                    appliedJobs={appliedJobs}
                    userApplications={userApplications}
                    userId={userId}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Followed Companies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Followed Companies ({followingCompanies.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FollowedCompanies companies={followingCompanies} />
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Saved Jobs ({savedJobs.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SavedJobs savedJobs={savedJobs} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
