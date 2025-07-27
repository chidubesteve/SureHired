"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components";
import {
  LuBuilding2,
  LuExternalLink,
  LuMapPin,
  LuSearch,
  LuUsers,
} from "react-icons/lu";
import { Input } from "@/components/ui/input";
import FilterPanel from "./components/FilterPanelComponent";
import Link from "next/link";
import Image from "next/image";
import { useGetAllCompaniesQuery } from "@/redux/services/company";
import debounce from "lodash.debounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Company } from "@/types/Company";
import FetchingError from "@/components/DataFetching/FetchingError";
import CompaniesPageSkeleton, {
  CompanyCardSkeleton,
} from "./components/CompanyPageSkeleton";
import { useSearchParams } from "next/navigation";

interface Filters {
  industries: string[];
  sizes: string[];
  workStyles: string[];
}

const Companies = () => {
  const searchParams = useSearchParams();
  const searchTermFromUrl = searchParams.get("search") || "";
  const industriesFromUrl =
    searchParams.get("industry")?.split(",").filter(Boolean) || [];
  const sizesFromUrl =
    searchParams.get("size")?.split(",").filter(Boolean) || [];
  const workStylesFromUrl =
    searchParams.get("workStyle")?.split(",").filter(Boolean) || [];
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [filters, setFilters] = useState<Filters>({
    industries: industriesFromUrl,
    sizes: sizesFromUrl,
    workStyles: workStylesFromUrl,
  });
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const limit = 9;

  const updateUrlParams = useCallback(
    (newParams: {
      search?: string;
      industry?: string[];
      size?: string[];
      workStyle?: string[];
      page?: number;
    }) => {
      const params = new URLSearchParams();
      if (newParams.search) {
        params.set("search", newParams.search);
      }
      if (newParams.industry?.length) {
        params.set("industry", newParams.industry.join(","));
      }
      if (newParams.size?.length) {
        params.set("size", newParams.size.join(","));
      }
      if (newParams.workStyle?.length) {
        params.set("workStyle", newParams.workStyle.join(","));
      }
      if (newParams.page && newParams.page > 1) {
        params.set("page", newParams.page.toString());
      }

      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    },
    []
  );

  // Create debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string, currentFilters: Filters) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
        updateUrlParams({
          search: value,
          industry: currentFilters.industries,
          size: currentFilters.sizes,
          workStyle: currentFilters.workStyles,
          page: 1,
        });
      }, 1000),
    [updateUrlParams]
  );

  // Handle search input changes
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      // Only debounce if the search term has 3+ characters or is empty
      if (value.length >= 3 || value.length === 0) {
        debouncedSearch(value, filters);
      }
    },
    [debouncedSearch, filters]
  );

  // Handle filter changes
  const handleFiltersChange = useCallback(
    (newFilters: Filters) => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to first page when filters change
      updateUrlParams({
        search: searchTerm,
        industry: newFilters.industries,
        size: newFilters.sizes,
        workStyle: newFilters.workStyles,
        page: 1,
      });
    },
    [searchTerm, updateUrlParams]
  );

  // Handle page changes
  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      updateUrlParams({
        search: searchTerm,
        industry: filters.industries,
        size: filters.sizes,
        workStyle: filters.workStyles,
        page: newPage,
      });
    },
    [searchTerm, filters, updateUrlParams]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const { data, isFetching, isLoading, error } = useGetAllCompaniesQuery({
    page: currentPage,
    limit,
    search: searchTerm,
    industry: filters.industries.join(","),
    size: filters.sizes.join(","),
    workStyle: filters.workStyles.join(","),
  });

  // Show full page skeleton during initial loading
  if (isLoading) {
    return <CompaniesPageSkeleton />;
  }

  if (error) {
    return (
      <FetchingError message={"Error loading companies. Please try again."} />
    );
  }

  const companies = data?.data || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-scroll">
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
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            <FilterPanel
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {companies.length} of {data?.pagination.totalCompanies}{" "}
            companies
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))}
            </>
          ) : (
            companies.map((company: Company) => (
              <div
                key={company.id}
                className="bg-white rounded-lg border border-neutral-200 hover:border-brand-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="p-6">
                  {/* Company Header */}
                  <Link href={`/companies/${company.id}`}>
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
                      {company.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span key={index} className="filter-chip text-xs">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </Link>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="text-sm text-brand-600 font-medium">
                      <Link href={`/companies/${company.id}#open-positions`}>
                        {company._count?.jobs || 0} open jobs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Empty State */}
        {!isLoading && companies.length === 0 && (
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

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent className="flex justify-end mt-6">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "!cursor-pointer"
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <span className="text-sm text-muted-foreground px-4 py-2">
                  Page {currentPage} of {data?.pagination?.totalPages || 1}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(
                      Math.min(
                        currentPage + 1,
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
      </div>
    </div>
  );
};

export default Companies;
