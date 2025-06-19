"use client";
import { Button } from "@/components/ui/button";
import { Jobs } from "@/data/Job";
import { formatPostedDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LuClock, LuDollarSign, LuMapPin, LuTrash2 } from "react-icons/lu";

type Props = {
  savedJobs: typeof Jobs;
};

const SavedJobs = ({ savedJobs }: Props) => {
  const [savedUserJobs, setSavedUserJobs] = useState(savedJobs);
  const handleUnsaveJob = (jobId: string) => {
    setSavedUserJobs((prev) => prev.filter((job) => job.id !== jobId));
  };
  return (
    <div className="space-y-4">
      {savedUserJobs.map((job) => (
        <div key={job.id} className="border border-neutral-200 rounded-lg p-4">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUnsaveJob(job.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                  <div className="flex items-center">
                    <LuMapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <LuDollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <LuClock className="w-4 h-4 mr-1" />
                    Posted {formatPostedDate(job.postedDate)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
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
    </div>
  );
};

export default SavedJobs;
