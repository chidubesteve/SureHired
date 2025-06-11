"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LuExternalLink, LuShare2 } from "react-icons/lu";
import { webShare } from "pwafire/web-share";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



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
}
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
}

const GoToCompany = ({ companyId }: { companyId: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() =>
        router.push(`/companies/${companyId}`)
      }
    >
      <LuExternalLink className="w-4 h-4 mr-2" />
      View Company Profile
    </Button>
  )
}

const HandleApply = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleJobApply = () => {
    console.log("Apply to job:", id);
    router.push(`/jobs/${id}/apply`); 
    // TODO: Implement apply functionality
  };
  return (
    <Button
      onClick={handleJobApply}
      className="w-full bg-brand-600 hover:bg-brand-700 text-white mb-4"
      size="lg"
    >
      Apply Now
    </Button>
  );
}
export { ShareJob, ExpandDescription, GoToCompany, HandleApply };
// These components are used in the job details page to share the job, expand the description, navigate to the company profile, and handle job applications.
// They are designed to be reusable and can be imported into other components or pages as needed.
