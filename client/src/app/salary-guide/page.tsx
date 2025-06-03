import { Header } from "@/components";
import { salaryData } from "@/data/Salary";
import React from "react";
import ClientJsx from "./ClientJsx";

const SalaryGuide = () => {
  const categories = [...new Set(salaryData.map((item) => item.category))];
  const experienceLevels = [
    ...new Set(salaryData.map((item) => item.experience)),
  ];


  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold md:text-4xl">Salary Guide</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover competitive salary ranges for your role and location. Our
            data is updated regularly to reflect current market trends.
          </p>
        </div>

        <ClientJsx
          categories={categories}
          experienceLevels={experienceLevels}
        />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl border border-neutral-200 p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            About Our Salary Data
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-neutral-600">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">
                Data Sources
              </h3>
              <p>
                Our salary information is compiled from thousands of job
                postings, employee submissions, and industry reports to provide
                the most accurate compensation data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">
                Regular Updates
              </h3>
              <p>
                We update our salary data monthly to reflect current market
                conditions and ensure you have access to the latest compensation
                trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryGuide;
