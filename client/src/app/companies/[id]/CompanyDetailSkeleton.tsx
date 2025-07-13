import { Header } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
     <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Company Header Skeleton */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start space-x-4 mb-4 md:mb-0">
              <Skeleton className="w-14 h-14 rounded-lg" />
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-6 w-40 mb-2" />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-10 w-32" />
              <div className="flex items-center space-x-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Mission Section Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Values Section Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-7 w-20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Open Jobs Section Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Company Stats Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>

            {/* Benefits Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-5 w-36 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start">
                    <Skeleton className="w-4 h-4 mt-1 mr-3 flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Offices Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="pb-3 last:pb-0 last:border-0 border-b border-neutral-100"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-40 ml-6" />
                  </div>
                ))}
              </div>
            </div>

            {/* Website Skeleton */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <Skeleton className="h-5 w-20 mb-4" />
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 mr-2" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCardSkeleton = () => {
  return (
    <div className="border border-neutral-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center space-x-4 text-sm mb-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

export default CompanyDetailSkeleton;
