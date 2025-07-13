"use client";
import { Header } from "@/components";
import BackToX from "@/components/BackToX";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import {
  LuAward,
  LuBuilding2,
  LuCalendar,
  LuExternalLink,
  LuGlobe,
  LuMapPin,
  LuStar,
  LuUsers,
} from "react-icons/lu";
import { RiUserFollowFill } from "react-icons/ri";
import {
  CompanySocialLinks,
  FollowCompanyButton,
  OpenJobsJsx,
} from "./ClientJsx";
import { useGetCompanyByIdQuery } from "@/redux/api/company";
import { Button } from "@/components/ui/button";
import FetchingError from "@/components/DataFetching/FetchingError";
import CompanyDetailSkeleton from "./CompanyDetailSkeleton";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const { data, isFetching, isLoading, error } = useGetCompanyByIdQuery(id);
  // Show skeleton during loading or fetching
  if ((isLoading || isFetching) && !data) {
    return <CompanyDetailSkeleton />;
  }
  const company = data?.data;

  if (!company) {
    return (
      <div className="text-center py-12">
        <LuBuilding2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          Company not found
        </h3>
        <Button
          variant="link"
          onClick={() => router.back()}
          className="text-neutral-600"
        >
          Go Back
        </Button>
      </div>
    );
  }

  if (error) return <FetchingError message="Failed to fetch company details" />;

  const openJobs = company.jobs?.filter((job) => job.status !== "Closed") || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <BackToX path="/companies" dest="Companies" />
        {/* Company Header */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start space-x-4 mb-4 md:mb-0">
              <Image
                className="w-14 h-14"
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                  company.name
                }&chars=${company.name.trim().split(/\s+/).length}&radius=25`}
                alt={company.name}
                width={50}
                height={50}
              />

              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                  {company.name}
                </h1>
                <p className="text-lg text-neutral-600 mb-2">
                  {company.industry}
                </p>
                <div className="flex items-center space-x-4 text-neutral-600">
                  <div className="flex items-center">
                    <LuMapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{company.hqLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <LuUsers className="w-4 h-4 mr-1" />
                    <span className="text-sm">{company.size}</span>
                  </div>
                  <div className="flex items-center">
                    <LuCalendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">Founded {company.founded}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <FollowCompanyButton />
              <div className="flex items-center space-x-1">
                <LuStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.4</span>&nbsp;|&nbsp;
                <span className="text-neutral-600 flex items-center gap-1">
                  <RiUserFollowFill /> {company.followers?.length ?? 0}{" "}
                  Followers
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                About {company.name}
              </h2>
              <div className="prose max-w-none">
                {company.description &&
                  company.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-neutral-600 mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Our Mission
              </h2>
              <p className="text-neutral-600">{company.mission}</p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Our Values
              </h2>
              <div className="flex flex-wrap gap-2">
                {company.values &&
                  company.values.map((value, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {value}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Open Jobs */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <OpenJobsJsx jobs={openJobs} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Company Data
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Employees</span>
                  <span className="font-medium">{company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Offices</span>
                  <span className="font-medium">
                    {company.offices && company.offices.length}
                  </span>
                </div>
                <CompanySocialLinks socials={company.socials} />
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Benefits & Perks
              </h3>
              <ul className="space-y-2">
                {company.benefits &&
                  company.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <LuAward className="w-4 h-4 text-brand-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-neutral-600 text-sm">
                        {benefit}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Offices */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">
                Office Locations
              </h3>
              <div className="space-y-3">
                {company.offices && company.offices.length > 0 ? (
                  company.offices.map((office, index) => (
                    <div
                      key={index}
                      className="pb-3 last:pb-0 last:border-0 border-b border-neutral-100"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <LuBuilding2 className="w-4 h-4 text-neutral-400" />
                        <span className="font-medium text-neutral-900">
                          {office.location}
                        </span>
                        {office.isHeadquarters && (
                          <Badge variant="secondary" className="text-xs">
                            HQ
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 ml-6">
                        {office.address}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">
                    No office locations available.
                  </p>
                )}
              </div>
            </div>

            {/* Website */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Website</h3>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-brand-600 hover:text-brand-700"
              >
                <LuGlobe className="w-4 h-4 mr-2" />
                {company.website}
                <LuExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
