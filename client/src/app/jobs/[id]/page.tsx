import { Header } from "@/components";
import BackToX from "@/components/BackToX";
import { ClientSaveButtonJsx } from "@/components/BookmarkX";
import { Jobs } from "@/data/Job";
import Image from "next/image";
import React from "react";
import {
  ExpandDescription,
  GoToCompany,
  HandleApply,
  ShareJob,
} from "./ClientJsx";
import {
  LuAward,
  LuBuilding2,
  LuClock,
  LuDollarSign,
  LuMapPin,
  LuUsers,
  LuBriefcase,  
} from "react-icons/lu";
import LocationDisplay from "@/components/showLocationTooltip";
import { formatPostedDate } from "@/utils/formatDate";
import { formatSalaryRange } from "@/utils/formatSalaryRange";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  // dynamic job id, use to fetch job details
  // static data for now
  const job = Jobs.find((job) => job.id === id);

  if (!job) {
    return (
      <div className="space-y-2 text-lg font-bold text-center flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl">404</h2>
        <LuBriefcase className="w-12 h-12" />
        <span>Job not found</span>
      </div>
    );
  }

  console.log("Job ID:", id);
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* back button */}
        <BackToX path="/jobs" dest="Jobs" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* main content */}
          <div className="lg:col-span-2">
            {/* Job header */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Image
                    className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-3xl"
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                      job.company.name
                    }&chars=${
                      job.company.name.trim().split(/\s+/).length
                    }&radius=25`}
                    alt={job.company.name}
                    width={40}
                    height={40}
                  />

                  <div>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-1">
                      {job.title}
                    </h1>
                    <p className="text-lg text-neutral-600 font-medium">
                      {job.company.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ClientSaveButtonJsx isHoverStyleApplied={false} />
                  <ShareJob title={job.title} description={job.description} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1.5fr_1fr] gap-2 mb-4">
                <div className="flex items-center text-neutral-600">
                  <LuMapPin className="w-4 h-4 mr-2" />
                  <LocationDisplay location={job.location} />
                </div>
                <div className="flex items-center text-neutral-600">
                  <LuClock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{job.type}</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <LuDollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {formatSalaryRange(job.salary)}
                  </span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <LuUsers className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {job.applications.length} applicants
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="filter-chip px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Job description */}

            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Job Description
              </h2>
              <ExpandDescription description={job.description} />
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-neutral-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            {/* responsibilities can be in the description of the <job></job> */}

            {/* Benefits */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <LuAward className="w-4 h-4 text-brand-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}

          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6 sticky top-24">
              <HandleApply id={job.id} />
              <p className="text-sm text-neutral-500 text-center">
                Posted {formatPostedDate(job.postedDate)} •{" "}
                {job.applications.length} applicants
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <LuBuilding2 className="w-5 h-5 text-neutral-400 mr-2" />
                <h3 className="text-lg font-semibold text-neutral-900">
                  About {job.company.name}
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Industry:</span>
                  <span className="text-neutral-900 font-medium">
                    {/* TODO: replace with actual industry */}
                    {/* {job.companyInfo.industry} */}
                    Technology
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Company size:</span>
                  <span className="text-neutral-900 font-medium">
                    {/* {job.companyInfo.size} */}
                    {/* TODO: replace with actual size */}
                    200-500
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Founded:</span>
                  <span className="text-neutral-900 font-medium">
                    {/* {job.companyInfo.founded} */}
                    {/* TODO: replace with actual founded */}
                    2010
                  </span>
                </div>
              </div>

              <p className="text-neutral-600 text-sm mb-4">
                {/* {job.companyInfo.description} */}
                {/* TODO: replace with actual description */}
                {/* {job.company.description || "No description available."} */}
                TechCorp is a leading technology company focused on building
                innovative solutions that help businesses grow and scale.
              </p>

              <GoToCompany companyId={job.company.companyId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
