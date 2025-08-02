"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import { LuClock, LuMapPin, LuTrash2 } from "react-icons/lu";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import Link from "next/link";
import Image from "next/image";
import LocationDisplay from "@/components/showLocationTooltip";
import { formatPostedDate } from "@/utils/formatDate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetUserJobApplicationsQuery } from "@/redux/services/user";
import FetchingError from "@/components/DataFetching/FetchingError";
import { PiReadCvLogo } from "react-icons/pi";

export enum UserApplicationStatus {
  Applied = "Applied",
  Interviewing = "Interviewing",
  Rejected = "Rejected",
  Hired = "Hired",
  Withdrawn = "Withdrawn",
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
  Open = "Open",
  Closed = "Closed",
}

// Skeleton component for individual job application card
const JobApplicationSkeleton = () => (
  <div className="border border-neutral-200 rounded-lg p-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4 flex-1">
        {/* Company logo skeleton */}
        <Skeleton className="w-12 h-12 rounded" />

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {/* Job title skeleton */}
              <Skeleton className="h-5 w-48 mb-1" />
              {/* Company name skeleton */}
              <Skeleton className="h-4 w-32" />
            </div>
            {/* Withdraw button skeleton */}
            <Skeleton className="h-8 w-8 rounded" />
          </div>

          {/* Job details skeleton */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Status badges skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for the entire applications list
const ApplicationsListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <JobApplicationSkeleton key={index} />
    ))}

    {/* Pagination skeleton */}
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-20 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-20 rounded" />
      </div>
    </div>
  </div>
);

// Loading overlay for fetching states
const FetchingOverlay = () => (
  <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-10">
    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md shadow-sm border">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-brand-600 border-t-transparent"></div>
      <span className="text-sm text-neutral-600">Updating...</span>
    </div>
  </div>
);

type Props = {
  userId: string;
};

const UserAppliedJobs = ({ userId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    data: getUserAppliedJobs,
    isLoading: applicationsLoading,
    isFetching: applicationsFetching,
    error: applicationsError,
  } = useGetUserJobApplicationsQuery({
    userId,
    page: currentPage,
    limit: itemsPerPage,
  });
  console.log("getUserAppliedJobs", getUserAppliedJobs);

  // Extract data arrays from API responses
  const appliedJobs = React.useMemo(
    () => getUserAppliedJobs?.data || [],
    [getUserAppliedJobs]
  );
  const [applications, setApplications] = useState(appliedJobs);

  // Update local state when new data arrives
  React.useEffect(() => {
    if (appliedJobs.length > 0) {
      setApplications(appliedJobs);
    }
  }, [appliedJobs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show skeleton during initial loading
  if (applicationsLoading) {
    return <ApplicationsListSkeleton count={itemsPerPage} />;
  }

  // Show error state
  if (applicationsError) {
    return <FetchingError message="Error fetching applications" />;
  }

  // Show empty state
  if (appliedJobs.length === 0 && !applicationsLoading) {
      return (
        <div className="text-center py-4">
          <div className="text-center text-muted-foreground py-8">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <PiReadCvLogo className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No job applications
            </h3>
            You haven&apos;t applied to any jobs yet.
          </div>
        </div>
      );
  }

  const handleWithdrawApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? { ...app, status: UserApplicationStatus.Withdrawn }
          : app
      )
    );
  };

  return (
    <div className="relative">
      {/* Show fetching overlay when refetching data */}
      {applicationsFetching && !applicationsLoading && <FetchingOverlay />}

      <div className="space-y-4">
        {applications.map((application) => {
          const { job } = application; // Extract the job from the application
          const isWithdrawable =
            [
              UserApplicationStatus.Applied,
              UserApplicationStatus.Interviewing,
            ].includes(application.status as UserApplicationStatus) &&
            job.status === JobLifecycleStatus.Open;

          return (
            <div
              key={application.id}
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
                          onClick={() =>
                            handleWithdrawApplication(application.id)
                          }
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={applicationsFetching}
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
                        <LiaMoneyBillWaveAltSolid className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <LuClock className="w-4 h-4 mr-1" />
                        Applied on {formatPostedDate(application.appliedAt)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          application.status as UserApplicationStatus
                        )}`}
                      >
                        {application.status}
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

        {getUserAppliedJobs && getUserAppliedJobs.total > itemsPerPage && (
          <Pagination>
            <PaginationContent className="flex justify-center mt-6">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1 || applicationsFetching
                      ? "pointer-events-none opacity-50"
                      : "!cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground px-4 py-2">
                  {applicationsFetching ? (
                    <Skeleton className="h-4 w-4 inline-block" />
                  ) : (
                    currentPage
                  )}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(
                      Math.min(
                        currentPage + 1,
                        getUserAppliedJobs?.totalPages || 1
                      )
                    )
                  }
                  className={
                    currentPage === getUserAppliedJobs?.totalPages ||
                    applicationsFetching
                      ? "pointer-events-none opacity-50"
                      : "!cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default UserAppliedJobs;
