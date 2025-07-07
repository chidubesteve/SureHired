import React from 'react'
import { Skeleton } from '../ui/skeleton';


const JobCardSkeleton = () => {
  return (
    <div className="job-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[180px]" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
        <Skeleton className="w-6 h-6 rounded" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-2" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

export default JobCardSkeleton;