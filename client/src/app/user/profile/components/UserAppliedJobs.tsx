"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LuClock, LuDollarSign, LuMapPin, LuTrash2 } from "react-icons/lu";
import { Jobs } from "@/data/Job";
import Link from "next/link";
import Image from "next/image";
import { Applications } from "@/data/Application";
import LocationDisplay from "@/components/showLocationTooltip";
import { formatPostedDate } from "@/utils/formatDate";

export enum UserApplicationStatus {
  Applied = "applied",
  Interviewing = "interviewing",
  Rejected = "rejected",
  Hired = "hired",
  Withdrawn = "withdrawn",
}

const getStatusColor = (status: UserApplicationStatus) => {
  switch (status) {
    case UserApplicationStatus.Applied:
      return "bg-blue-100 text-blue-800";
    case UserApplicationStatus.Interviewing:
      return "bg-yellow-100 text-yellow-800";
    case UserApplicationStatus.Rejected:
      return "bg-red-100 text-red-800";
    case UserApplicationStatus.Hired:
      return "bg-green-100 text-green-800";
    case UserApplicationStatus.Withdrawn:
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

enum JobLifecycleStatus {
  Open = "open",
  Closed = "closed",
}

type Props = {
  appliedJobs: typeof Jobs;
  userApplications: typeof Applications;
  userId: string;
};

const UserAppliedJobs = ({ appliedJobs, userApplications, userId }: Props) => {
  const [applicationState, setApplicationState] = useState(userApplications);

  const handleWithdrawApplication = (jobId: string) => {
    const application = applicationState.find(
      (app) => app.jobId === jobId && app.userId === userId
    );
    const job = appliedJobs.find((job) => job.id === jobId);

    if (!job || !application) return;

    if (
      [
        UserApplicationStatus.Applied,
        UserApplicationStatus.Interviewing,
      ].includes(application.status as UserApplicationStatus) &&
      job.status === JobLifecycleStatus.Open
    ) {
      setApplicationState((prev) =>
        prev.map((app) =>
          app.id === application.id
            ? { ...app, status: UserApplicationStatus.Withdrawn }
            : app
        )
      );
    }
  };

  return (
    <div className="space-y-4">
      {appliedJobs.map((job) => {
        // Find the user's application for this job
        const userApplication = applicationState.find(
          (app) => app.jobId === job.id && app.userId === userId
        );

        const isWithdrawable =
          userApplication &&
          [
            UserApplicationStatus.Applied,
            UserApplicationStatus.Interviewing,
          ].includes(userApplication.status as UserApplicationStatus) &&
          job.status === JobLifecycleStatus.Open;
        return (
          <div
            key={job.id}
            className="border border-neutral-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <Image
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                    job.company.name
                  }&chars=${
                    job.company.name.trim().split(/\s+/).length
                  }&radius=25`}
                  alt={job.company.name}
                  width={40}
                  height={40}
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/jobs/${job.id}`}>
                        <h3 className="font-semibold text-neutral-900 hover:text-brand-600 transition-colors">
                          {job.title}
                        </h3>
                      </Link>
                      <p className="text-neutral-600">{job.company.name}</p>
                    </div>
                    {isWithdrawable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWithdrawApplication(job.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                    <div className="flex items-center">
                      <LuMapPin className="w-4 h-4 mr-1" />
                      <LocationDisplay location={job.location} />
                    </div>
                    <div className="flex items-center">
                      <LuDollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <LuClock className="w-4 h-4 mr-1" />
                      Applied on {formatPostedDate(job.postedDate)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        (userApplication?.status as UserApplicationStatus) ||
                          UserApplicationStatus.Withdrawn
                      )}`}
                    >
                      {userApplication?.status
                        ? userApplication.status.charAt(0).toUpperCase() +
                          userApplication.status.slice(1)
                        : "Withdrawn"}
                    </span>
                    <span className="text-xs text-neutral-500">
                      Job Status:{" "}
                      {job.status === JobLifecycleStatus.Open
                        ? "Open"
                        : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserAppliedJobs;
