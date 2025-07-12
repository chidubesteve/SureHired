import { Header } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

const CompaniesPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header would be rendered here - assuming it doesn't need skeleton */}
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-5 w-48" />
        </div>

        {/* Companies Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <CompanyCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompanyCardSkeleton = () => {
  return (
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        {/* Company Header Skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="w-4 h-4" />
        </div>

        {/* Company Info Skeleton */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-neutral-100">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
  );
};

export default CompaniesPageSkeleton;
