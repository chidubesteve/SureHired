"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuFilter, LuMapPin, LuSearch } from "react-icons/lu";

const ClientSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Search:", { searchQuery, location });
  };
  return (
    <div className="bg-white border-b border-neutral-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="search-input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <LuMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="search-input pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={handleSearch}
            className="bg-brand-600 hover:bg-brand-700 px-8"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

type FilterValues = {
  jobType: string[];
  salaryRange: string[];
  workStyle: string[];
};

const jobTypes = ["Full-time", "Part-time", "Contract"];
const salaryRanges = ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"];
const workStyles = ["Remote", "On-site", "Hybrid"];

const FilterForm = () => {
  const { register, watch, getValues, reset } = useForm<FilterValues>({
    defaultValues: {
      jobType: [],
      salaryRange: [],
      workStyle: [],
    },
  });

  const selectedFilters = watch();

  // You can send filters to backend or URL when any change occurs
  useEffect(() => {
    console.log("Selected filters:", selectedFilters);
    // You can send `selectedFilters` to backend or update the query string
  }, [selectedFilters]);

  const handleApplyFilters = () => {
    const filters = getValues();
    console.log("Selected Filters:", filters);
    // Send to backend or update search params here
  };

  const handleResetFilters = () => {
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Job type filter */}
      <div>
        <h4 className="font-medium text-neutral-700 mb-3">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 mr-2"
                {...register("jobType")}
              />
              <span className="text-neutral-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h4 className="font-medium text-neutral-700 mb-3">Salary Range</h4>
        <div className="space-y-2">
          {salaryRanges.map((range) => (
            <label key={range} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 mr-2"
                {...register("salaryRange")}
              />
              <span className="text-neutral-600">{range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Style */}
      <div>
        <h4 className="font-medium text-neutral-700 mb-3">Work Style</h4>
        <div className="space-y-2">
          {workStyles.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-neutral-300 mr-2"
                {...register("workStyle")}
              />
              <span className="text-neutral-600">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters} className="bg-brand-600 hover:bg-brand-700">Apply</Button>
      </div>
    </div>
  );
};

const ClientFilter = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button for small/medium screens */}
      <div className="lg:hidden mb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-md text-neutral-700 min-w-28">
              <LuFilter className="w-5 h-5" />
              Filters
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-6">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <LuFilter className="w-5 h-5" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <FilterForm />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for large screens */}
      <div className="hidden lg:block lg:w-1/4 sticky h-fit top-24 space-y-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h3 className="font-semibold text-neutral-900 mb-4 flex items-center">
            <LuFilter className="w-5 h-5 mr-2" />
            Filters
          </h3>
          <FilterForm />
        </div>
      </div>
    </>
  );
};

export { ClientSearch, ClientFilter };
