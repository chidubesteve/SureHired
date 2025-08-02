"use client";
import FetchingError from "@/components/DataFetching/FetchingError";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserFollowedCompaniesQuery } from "@/redux/services/user";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { LuUserMinus } from "react-icons/lu";

// Skeleton component for individual company card
const CompanyCardSkeleton = () => (
  <div className="border border-neutral-200 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        {/* Company logo skeleton */}
        <Skeleton className="w-12 h-12 rounded" />

        <div className="flex-1">
          {/* Company name skeleton */}
          <Skeleton className="h-5 w-48 mb-2" />
          {/* Industry and size skeleton */}
          <Skeleton className="h-4 w-32 mb-2" />
          {/* Description skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Unfollow button skeleton */}
      <Skeleton className="h-9 w-24 rounded" />
    </div>
  </div>
);

// Skeleton for the entire companies list
const CompaniesListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <CompanyCardSkeleton key={index} />
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
  <div className="text-center py-4">
    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <LuUserMinus className="w-6 h-6 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      No followed companies
    </h3>
    <p className="text-gray-500">You haven&apos;t followed any companies yet.</p>
  </div>
);

type Props = {
  userId: string;
};

const FollowedCompanies = ({ userId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    data: getUserFollowedCompaniesData,
    isLoading: followedLoading,
    isFetching: followedFetching,
    error: followedError,
  } = useGetUserFollowedCompaniesQuery({
    userId,
    page: currentPage,
    limit: itemsPerPage,
  });

  const followedCompanies = useMemo(
    () => getUserFollowedCompaniesData?.data || [],
    [getUserFollowedCompaniesData]
  );

  const [followingCompanies, setFollowingCompanies] =
    useState(followedCompanies);

  // Update local state when new data arrives
  useEffect(() => {
    if (followedCompanies.length >= 0) {
      setFollowingCompanies(followedCompanies);
    }
  }, [followedCompanies]);

  console.log("getUserFollowedCompanies", getUserFollowedCompaniesData);

  // Show skeleton during initial loading
  if (followedLoading) {
    return <CompaniesListSkeleton count={itemsPerPage} />;
  }

  // Show error state
  if (followedError) {
    return <FetchingError message="Error fetching followed companies" />;
  }

  // Show empty state when no companies are followed
  if (followedCompanies.length === 0 && !followedLoading) {
    return <EmptyState />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUnfollowCompany = (companyId: string) => {
    setFollowingCompanies(
      followingCompanies.filter((company) => company.companyId !== companyId)
    );
    console.log("Unfollowed company:", companyId);
  };

  const shouldShowPagination =
    getUserFollowedCompaniesData && getUserFollowedCompaniesData?.total >
    itemsPerPage;

  return (
    <div className="relative">
      {/* Show fetching overlay when refetching data */}
      {followedFetching && !followedLoading && <FetchingOverlay />}

      <div className="space-y-4">
        {followingCompanies.map((company) => (
          <div
            key={company.id}
            className="border border-neutral-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <Image
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                    company.company.name
                  }&chars=${
                    company.company.name.trim().split(/\s+/).length
                  }&radius=25`}
                  alt={company.company.name}
                  width={40}
                  height={40}
                  className="w-12 h-12"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 text-lg">
                    {company.company.name}
                  </h3>
                  <p className="text-neutral-600">
                    {company.company.industry} • {company.company.size}
                  </p>
                  <p className="text-neutral-500 text-sm mt-1">
                    {company.company.description}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleUnfollowCompany(company.companyId)}
                disabled={followedFetching}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 disabled:opacity-50"
              >
                <LuUserMinus className="w-4 h-4 mr-2" />
                Unfollow
              </Button>
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
                    currentPage === 1 || followedFetching
                      ? "pointer-events-none opacity-50"
                      : "!cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground px-4 py-2">
                  {followedFetching ? (
                    <Skeleton className="h-4 w-4 inline-block " />
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
                        getUserFollowedCompaniesData?.totalPages || 1
                      )
                    )
                  }
                  className={
                    currentPage === getUserFollowedCompaniesData?.totalPages ||
                    followedFetching
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

export default FollowedCompanies;
