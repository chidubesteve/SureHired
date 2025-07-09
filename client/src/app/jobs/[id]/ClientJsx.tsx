"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LuExternalLink, LuShare2 } from "react-icons/lu";
import { webShare } from "pwafire/web-share";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";
import { Tooltip, TooltipArrow } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components";

type Props = {
  title: string;
  description: string;
  url?: string;
};

const ShareJob = ({ title, description, url }: Props) => {
  const handleShare = () => {
    const data = {
      title: title,
      text: description.slice(0, 100) + "...",
      url: url || typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator === "undefined" || !navigator.share) {
      toast.error("Sharing is not supported on this device.");
      return;
    }

    webShare(data)
      .then(() => {
        toast.success("Job shared successfully!");
      })
      .catch((error) => {
        console.error("Job sharing failed:", error);
        toast.error("Job sharing failed");
      });
  };
  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <LuShare2 className="w-4 h-4" />
    </Button>
  );
};

type JobDescProps = {
  description: string;
};
const ExpandDescription = ({ description }: JobDescProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="relative">
      <p
        className={`text-neutral-600 whitespace-pre-line transition-all duration-300 ${
          expanded ? "" : "line-clamp-6"
        }`}
      >
        {description}
      </p>

      {!expanded ? (
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none">
          <Button
            variant="ghost"
            onClick={() => setExpanded(true)}
            className="pointer-events-auto mt-2 text-brand-600 hover:text-brand-700 hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none"
          >
            See more
          </Button>
        </div>
      ) : (
        <Button
          variant="link"
          onClick={() => setExpanded(false)}
          className="pointer-events-auto mt-2 text-brand-600 hover:text-brand-700 hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none inline"
        >
          See less
        </Button>
      )}
    </div>
  );
};

const GoToCompany = ({ companyId }: { companyId: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push(`/companies/${companyId}`)}
    >
      <LuExternalLink className="w-4 h-4 mr-2" />
      View Company Profile
    </Button>
  );
};

interface HandleApplyProps {
  id: string;
  applicationMethod?: "In_app" | "External";
  applicationUrl?: string | null;
}

const HandleApply = ({
  id,
  applicationMethod,
  applicationUrl,
}: HandleApplyProps) => {
  const router = useRouter();
  const handleJobApply = () => {
    console.log("Apply to job:", id);

    if (applicationMethod === "External" && applicationUrl) {
      window.open(applicationUrl, "_blank");
    } else {
      router.push(`/jobs/${id}/apply`);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleJobApply}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white mb-4"
          size="lg"
        >
          <span>Apply Now</span>
          {applicationMethod === "External" && (
            <FiExternalLink className="inline-block" />
          )}
        </Button>
      </TooltipTrigger>
      {applicationMethod === "External" && (
        <TooltipContent
          sideOffset={5}
          className="bg-neutral-100 text-neutral-900 p-2 rounded"
        >
          <TooltipArrow className="fill-neutral-200" width={11} height={7} />
          You will be redirected to an external site to apply
        </TooltipContent>
      )}
    </Tooltip>
  );
};

const JobHeaderSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
          <div>
            <Skeleton className="h-8 w-[300px] mb-2" />
            <Skeleton className="h-6 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
};

const JobSectionSkeleton = ({
  title,
  listItems = 4,
}: {
  title: string;
  listItems?: number;
}) => {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
      <Skeleton className="h-6 w-[180px] mb-4" />
      {title === "Job Description" ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[75%]" />
        </div>
      ) : (
        <ul className="space-y-3">
          {Array.from({ length: listItems }).map((_, index) => (
            <li key={index} className="flex items-start">
              <Skeleton className="w-4 h-4 mt-1 mr-3 flex-shrink-0" />
              <Skeleton className="h-4 w-[85%]" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ApplySectionSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6 sticky top-24">
      <Skeleton className="h-12 w-full mb-4 rounded-md" />
      <Skeleton className="h-4 w-[200px] mx-auto" />
    </div>
  );
};

const CompanyInfoSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="flex items-center mb-4">
        <Skeleton className="w-5 h-5 mr-2" />
        <Skeleton className="h-6 w-[150px]" />
      </div>
      <div className="space-y-3 mb-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

const JobDetailsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* back button skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-[120px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* main content */}
          <div className="lg:col-span-2">
            <JobHeaderSkeleton />
            <JobSectionSkeleton title="Job Description" />
            <JobSectionSkeleton title="Requirements" listItems={6} />
            <JobSectionSkeleton title="Benefits" listItems={5} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ApplySectionSkeleton />
            <CompanyInfoSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ShareJob, ExpandDescription, GoToCompany, HandleApply, JobDetailsPageSkeleton, JobHeaderSkeleton, JobSectionSkeleton, ApplySectionSkeleton, CompanyInfoSkeleton };
// These components are used in the job details page to share the job, expand the description, navigate to the company profile, and handle job applications.
// They are designed to be reusable and can be imported into other components or pages as needed.
