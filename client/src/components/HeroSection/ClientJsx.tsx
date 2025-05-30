"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, Search } from "lucide-react";
import { JOB_CATEGORIES } from "@/config/job-categories";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClientJsx = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const handleSearch = () => {
    console.log("Search:", { searchQuery, location, category });
    // TODO: Implement search functionality
  };
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-neutral-200 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="search-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="City, state, or remote"
            className="search-input pl-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="relative flex items-center">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="md:w-[280px] w-full pl-10">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {JOB_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        onClick={handleSearch}
        className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 text-base font-semibold"
      >
        Search Jobs
      </Button>
    </div>
  );
};

export default ClientJsx;
