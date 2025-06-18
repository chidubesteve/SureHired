"use client"
import { Button } from "@/components/ui/button";
import { Companies } from "@/data/Company";
import Image from "next/image";
import React, { useState } from "react";
import { LuUserMinus } from "react-icons/lu";

type Props = {
  companies: typeof Companies;
};

const FollowedCompanies = ({ companies }: Props) => {
  const [followingCompanies, setFollowingCompanies] = useState(companies);
  const handleUnfollowCompany = (companyId: string) => {
    setFollowingCompanies(
      followingCompanies.filter((company) => company.id !== companyId)
    );
    console.log("Unfollowed company:", companyId);
   
  };
  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <div
          key={company.id}
          className="border border-neutral-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                  company.name
                }&chars=${company.name.trim().split(/\s+/).length}&radius=25`}
                alt={company.name}
                width={40}
                height={40}
                className="w-12 h-12"
              />
              <div>
                <h3 className="font-semibold text-neutral-900 text-lg">
                  {company.name}
                </h3>
                <p className="text-neutral-600">
                  {company.industry} • {company.size}
                </p>
                <p className="text-neutral-500 text-sm mt-1">
                  {company.description}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => handleUnfollowCompany(company.id)}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <LuUserMinus className="w-4 h-4 mr-2" />
              Unfollow
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowedCompanies;
