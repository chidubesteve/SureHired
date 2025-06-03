"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { salaryData } from "@/data/Salary";
import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import {
  LuMapPin,
  LuSearch,
  LuTrendingDown,
  LuTrendingUp,
} from "react-icons/lu";


type ClientJsxProps = {
  categories: string[];
  experienceLevels: string[];
};

const ClientJsx = ({
  categories,
  experienceLevels
}: ClientJsxProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string>("all");

  const filteredData = salaryData.filter((item) => {
    const matchesItem = item.role
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesExperience =
      selectedExperience === "all" || item.experience === selectedExperience;
    return matchesItem && matchesCategory && matchesExperience;
  });
    
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <LuTrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <LuTrendingDown className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

    
  return (
    <>
      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search by role or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[240px] sm:w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Select Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience Levels</SelectItem>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.role}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <LuMapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </CardDescription>
                </div>
                {getTrendIcon(item.trend)}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{item.category}</Badge>
                <Badge variant="outline">{item.experience}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">
                    {formatSalary(item.averageSalary)}
                  </div>
                  <div className="text-sm text-neutral-500">Average Salary</div>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-medium">
                      {formatSalary(item.minSalary)}
                    </div>
                    <div className="text-neutral-500">Minimum</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatSalary(item.maxSalary)}
                    </div>
                    <div className="text-neutral-500">Maximum</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <FaBriefcase className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">
            No salary data found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </>
  );
};

export default ClientJsx;
