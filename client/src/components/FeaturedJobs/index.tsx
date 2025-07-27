"use client";
import React from "react";
import Image from "next/image";
import { ClientSaveButtonJsx } from "../BookmarkX";
import { LuClock, LuMapPin } from "react-icons/lu";
import { formatPostedDate } from "./../../utils/formatDate";
import Link from "next/link";
import { Button } from "../ui/button";
import LocationDisplay from "../showLocationTooltip";
import { useGetFeaturedJobsQuery } from "@/redux/services/Jobs";
import FetchingError from "../DataFetching/FetchingError";
import JobCardSkeleton from "./JobCardSkeleton";
import { Skeleton } from "../ui/skeleton";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

const FeaturedJobs = () => {
  const { data, isLoading, isFetching, error } = useGetFeaturedJobsQuery();
  if (error) {
    return <FetchingError message="Sorry, failed to fetch featured jobs." />;
  }
  // const isFeaturedJobs = Jobs.filter((job) => job.isFeatured);
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            Featured Jobs
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Hand-picked opportunities from top-searching companies looking for
            talented professionals like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(isLoading || isFetching) && !data
            ? Array.from({ length: 6 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            : data &&
              data.data.length > 0 &&
              data.data.map((job) => (
                <div key={job.id} className="job-card group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
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
                      <div>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-neutral-600">{job.company.name}</p>
                      </div>
                    </div>
                    <ClientSaveButtonJsx />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-neutral-600 text-sm">
                      <LuMapPin className="w-4 h-4 mr-2" />
                      <LocationDisplay location={job.location} />
                    </div>
                    <div className="flex items-center text-neutral-600 text-sm">
                      <LuClock className="w-4 h-4 mr-2" />
                      {job.type} • {formatPostedDate(job.postedDate)}
                    </div>
                    <div className="flex items-center text-neutral-600 text-sm">
                      <LiaMoneyBillWaveAltSolid className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                  </div>

                  {/* tags */}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="filter-chip text-xs px-2 py-1 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/jobs/${job.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              ))}
        </div>
        <div className="text-center">
          {isLoading || isFetching ? (
            <Skeleton className="w-40 h-10 justify-self-center" />
          ) : (
            <Link href={"/jobs"}>
              <Button variant={"outline"} size="lg" className="font-medium">
                View All Jobs
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
