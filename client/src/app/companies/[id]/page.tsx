import { Header } from "@/components";
import BackToX from "@/components/BackToX";
import { Badge } from "@/components/ui/badge";
import { Companies } from "@/data/Company";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
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
import { CompanySocialLinks, FollowCompanyButton, OpenJobsJsx } from "./ClientJsx";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const company = Companies.find((company) => company.id === id);

  if (!company) return notFound();

  const openJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      postedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      type: "Full-time",
      location: "New York, NY",
      salary: "$130k - $170k",
      postedAt: "1 week ago",
    },
    {
      id: 3,
      title: "UX Designer",
      type: "Full-time",
      location: "Remote",
      salary: "$100k - $140k",
      postedAt: "3 days ago",
    },
  ];

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
                <span className="font-medium">4.4</span>
                <span className="text-neutral-600">(27 reviews)</span>
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
                {company.description.split("\n\n").map((paragraph, index) => (
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
                {company.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
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
                  <span className="font-medium">{company.offices.length}</span>
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
                {company.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <LuAward className="w-4 h-4 text-brand-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-neutral-600 text-sm">{benefit}</span>
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
                {company.offices.map((office, index) => (
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
                ))}
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

export default page;
