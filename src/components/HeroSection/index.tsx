"use client";

import React from "react";
import ClientJsx from "./ClientJsx";


const HeroSection = () => {


  return (
    <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Find your{" "}
            <span className="text-gradient from-orange-accent to-orange-accent-dark">
              Dream Job
            </span>
            <br />
            With Top Companies
          </h1>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto animate-slide-up">
            Discover thousands of job opportunities from leading companies
            worldwide. Build your career with the best employers in your
            industry.
          </p>

          {/* Search Bar / client component*/}
            <ClientJsx />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                50K+
              </div>
              <div className="text-neutral-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                10K+
              </div>
              <div className="text-neutral-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                1M+
              </div>
              <div className="text-neutral-600">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                95%
              </div>
              <div className="text-neutral-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
