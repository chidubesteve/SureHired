"use client";
import React, { useState } from "react";
import { Companies as CompanyData } from "@/data/Company";
import { Header } from "@/components";
import {
  LuBuilding2,
  LuExternalLink,
  LuMapPin,
  LuSearch,
  LuUsers,
} from "react-icons/lu";
import { Input } from "@/components/ui/input";
import FilterPanel from "./FilterPanelComponent";
import Link from "next/link";
import Image from "next/image";

interface Filters {
  industries: string[];
  sizes: string[];
  workStyles: string[];
}

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    industries: [],
    sizes: [],
    workStyles: [],
  });
  const filteredCompanies = CompanyData.filter((company) => {
    // search filter
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.hqLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.offices.some((office) =>
        office.location.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Industry filter
    const matchesIndustry =
      filters.industries.length === 0 ||
      filters.industries.includes(company.industry);

    // Size filter
    const matchesSize =
      filters.sizes.length === 0 || filters.sizes.includes(company.size);

    // Work style filter
    const matchesWorkStyle =
      filters.workStyles.length === 0 ||
      filters.workStyles.includes(company.workStyle);

    return matchesSearch && matchesIndustry && matchesSize && matchesWorkStyle;
  });
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Explore Companies
          </h1>
          <p className="text-neutral-600">
            Discover amazing companies and find your next opportunity
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                placeholder="Search companies by name, industry, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <FilterPanel onFiltersChange={setFilters} />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredCompanies.length} companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="bg-white rounded-lg border border-neutral-200 hover:border-brand-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="p-6">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                        company.name
                      }&chars=${
                        company.name.trim().split(/\s+/).length
                      }&radius=25`}
                      alt={company.name}
                      className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-2xl"
                      width={38}
                      height={38}
                    />
                    <div>
                      <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                  <LuExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-brand-600 transition-colors" />
                </div>

                {/* Company Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-neutral-600 text-sm">
                    <LuMapPin className="w-4 h-4 mr-2" />
                    {company.hqLocation}
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm">
                    <LuUsers className="w-4 h-4 mr-2" />
                    {company.size} employees
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm">
                    <LuBuilding2 className="w-4 h-4 mr-2" />
                    Founded {company.founded}
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {company.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="filter-chip text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="text-sm text-brand-600 font-medium">
                    {/* TODO: Replace with actual number of open jobs */}6 open
                    jobs
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <LuBuilding2 className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No companies found
            </h3>
            <p className="text-neutral-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
