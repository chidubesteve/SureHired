"use client";
import { Header } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPostedDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LuBookmark, LuClock, LuMapPin } from "react-icons/lu";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import {
  ClientFilter,
  ClientSearch,
  JobListHeaderSkeleton,
  JobListSkeleton,
  PaginationSkeleton,
} from "./components/ClientJsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LocationDisplay from "@/components/showLocationTooltip";
import { formatSalaryRange } from "@/utils/formatSalaryRange";
import { useGetAllJobsQuery } from "@/redux/services/Jobs";
import FetchingError from "@/components/DataFetching/FetchingError";

const Page = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetAllJobsQuery({
    page: currentPage,
    limit: pageSize,
  });

  if (error) {
    return <FetchingError message="Sorry, failed to fetch jobs." />;
  }

  console.log("Jobs data:", data);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      {/* Search Header */}
      <ClientSearch />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Filters sidebar */}
          <ClientFilter />

          {/* Job Listings */}
          <div className="flex-1">
            {(isLoading || isFetching) && !data ? (
              <>
                <JobListHeaderSkeleton />
                <div className="space-y-4 flex flex-col items-center">
                  {Array.from({ length: pageSize }).map((_, index) => (
                    <JobListSkeleton key={index} />
                  ))}
                </div>
                <PaginationSkeleton />
              </>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h1 className="text-lg md:text-2xl font-bold text-neutral-900">
                      Job Opportunities
                    </h1>
                    <p className="text-neutral-600">
                      {data?.pagination?.totalJobs || 0} jobs found
                    </p>
                  </div>
                  <div className="flex items-center md:space-x-4">
                    <span className="text-neutral-600 m-0">Sort by:</span>
                    <Select defaultValue="most_recent">
                      <SelectTrigger className="w-[180px] flex items-center space-x-1 text-sm font-medium text-neutral-700 hover:text-neutral-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="most_recent">
                            Most Recent
                          </SelectItem>
                          <SelectItem value="most_relevant">
                            Most Relevant
                          </SelectItem>
                          <SelectItem value="most_popular">
                            Most Popular
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4 flex flex-col items-center">
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((job) => (
                      <div
                        key={job.id}
                        className="job-card group w-full max-w-5xl"
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
                              className="w-[40px]"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <Link href={`/jobs/${job.id}`}>
                                    <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors text-lg">
                                      {job.title}
                                    </h3>
                                  </Link>
                                  <p className="text-neutral-600 font-medium">
                                    {job.company.name}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <LuBookmark className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                                <div className="flex items-center">
                                  <LuMapPin className="w-4 h-4 mr-1" />
                                  <LocationDisplay location={job.location} />
                                </div>
                                <div className="flex items-center">
                                  <LuClock className="w-4 h-4 mr-1" />
                                  {job.type} •{" "}
                                  {formatPostedDate(job.postedDate)}
                                </div>
                                <div className="flex items-center">
                                  <LiaMoneyBillWaveAltSolid className="w-4 h-4 mr-1" />
                                  {formatSalaryRange(job.salary)}
                                </div>
                              </div>

                              <p className="text-neutral-600 mb-4 line-clamp-2">
                                {job.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="filter-chip px-2 py-1 text-xs font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-900 font-bold text-xl">
                      No jobs found
                    </p>
                  )}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent className="flex justify-end mt-6">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "!cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <span className="text-sm text-muted-foreground px-4 py-2">
                          Page {currentPage} of{" "}
                          {data?.pagination?.totalPages || 1}
                        </span>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(
                                prev + 1,
                                data?.pagination?.totalPages || 1
                              )
                            )
                          }
                          className={
                            currentPage === data?.pagination?.totalPages
                              ? "pointer-events-none opacity-50 "
                              : "!cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
