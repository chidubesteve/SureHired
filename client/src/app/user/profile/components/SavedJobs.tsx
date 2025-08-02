"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPostedDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuClock, LuMapPin, LuTrash2, LuBookmark } from "react-icons/lu";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { useGetUserBookmarksQuery } from "@/redux/services/user";
import FetchingError from "@/components/DataFetching/FetchingError";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Skeleton component for individual saved job card
const SavedJobCardSkeleton = () => (
  <div className="border border-neutral-200 rounded-lg p-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4 flex-1">
        {/* Company logo skeleton */}
        <Skeleton className="w-12 h-12 rounded-md" />

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {/* Job title skeleton */}
              <Skeleton className="h-5 w-56 mb-1" />
              {/* Company name skeleton */}
              <Skeleton className="h-4 w-32" />
            </div>
            {/* Unsave button skeleton */}
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

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-14 rounded-md" />
            <Skeleton className="h-6 w-18 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for the entire saved jobs list
const SavedJobsListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <SavedJobCardSkeleton key={index} />
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

// Empty state component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <LuBookmark className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs</h3>
    <p className="text-gray-500 mb-4">You haven&apos;t saved any jobs yet.</p>
    <Button asChild>
      <Link href="/jobs">Browse Jobs</Link>
    </Button>
  </div>
);

type Props = {
  userId: string;
};

const SavedJobs = ({ userId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    data: getUserBookmarks,
    isLoading: bookmarkLoading,
    isFetching: bookmarkFetching,
    error: bookmarkError,
  } = useGetUserBookmarksQuery({
    userId,
    page: currentPage,
    limit: itemsPerPage,
  });

  const savedJobs = React.useMemo(
    () => getUserBookmarks?.data || [],
    [getUserBookmarks]
  );
  const [savedUserJobs, setSavedUserJobs] = useState(savedJobs);

  // Update local state when new data arrives
  useEffect(() => {
    if (savedJobs.length >= 0) {
      setSavedUserJobs(savedJobs);
    }
  }, [savedJobs]);

  // Show skeleton during initial loading
  if (bookmarkLoading) {
    return <SavedJobsListSkeleton count={itemsPerPage} />;
  }

  // Show error state
  if (bookmarkError) {
    return <FetchingError message="Error fetching bookmarks" />;
  }

  // Show empty state when no jobs are saved
  if (savedJobs.length === 0 && !bookmarkLoading) {
    return <EmptyState />;
  }

  console.log("getUserBookmarks", getUserBookmarks);

  const shouldShowPagination =
    getUserBookmarks && getUserBookmarks?.total > itemsPerPage;

  const handleUnsaveJob = (jobId: string) => {
    setSavedUserJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative">
      {/* Show fetching overlay when refetching data */}
      {bookmarkFetching && !bookmarkLoading && <FetchingOverlay />}

      <div className="space-y-4">
        {savedUserJobs.map((job) => (
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
                          {job.job.title}
                        </h3>
                      </Link>
                      <p className="text-neutral-600">{job.company.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUnsaveJob(job.id)}
                      disabled={bookmarkFetching}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                    <div className="flex items-center">
                      <LuMapPin className="w-4 h-4 mr-1" />
                      {job.job.location}
                    </div>
                    <div className="flex items-center">
                      <LiaMoneyBillWaveAltSolid className="w-4 h-4 mr-1" />
                      {job.job.salary}
                    </div>
                    <div className="flex items-center">
                      <LuClock className="w-4 h-4 mr-1" />
                      Posted {formatPostedDate(job.job.postedDate)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-brand-50 text-brand-600 text-xs font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {shouldShowPagination && (
          <Pagination>
            <PaginationContent className="flex justify-center mt-6">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1 || bookmarkFetching
                      ? "pointer-events-none opacity-50"
                      : "!cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground px-4 py-2">
                  {bookmarkFetching ? (
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
                        getUserBookmarks?.totalPages || 1
                      )
                    )
                  }
                  className={
                    currentPage === getUserBookmarks?.totalPages ||
                    bookmarkFetching
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

export default SavedJobs;
