"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import {
  FaLinkedin,
  FaTiktok,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { GoLink } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";

const FollowCompanyButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleFollow}
        variant={isFollowing ? "outline" : "default"}
        className={isFollowing ? "" : "bg-brand-600 hover:bg-brand-700"}
      >
        {isFollowing ? "Following" : "Follow Company"}
      </Button>
      <Button variant="outline" size="sm" onClick={() => window.open("https://example.com", "_blank")}>
        <LuExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
};

// demo open jobs data

type props = {
  jobs: {
    id: number;
    title: string;
    type: string;
    location: string;
    salary: string;
    postedAt: string;
    // description: string;
  }[];
};

const OpenJobsJsx = ({ jobs }: props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Open Positions
        </h2>
        <Link
          href="/jobs"
          className="text-brand-600 hover:text-brand-700 font-medium"
        >
          View all jobs
        </Link>
      </div>
      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="block p-4 border border-neutral-200 rounded-lg hover:border-brand-200 hover:bg-brand-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-neutral-600">
                  <span>{job.type}</span>
                  <span>{job.location}</span>
                  <span>{job.salary}</span>
                </div>
              </div>
              <span className="text-sm text-neutral-500">{job.postedAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

type Socials = {
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  other?: string;
};

type Props = {
  socials?: Socials;
};

const CompanySocialLinks = ({ socials }: Props) => {
  const iconMap: Record<string, React.ReactNode> = {
    linkedin: <FaLinkedin className="w-5 h-5" />,
    github: <FaGithub className="w-5 h-5" />,
    twitter: <FaXTwitter className="w-5 h-5" />,
    facebook: <FaFacebook className="w-5 h-5" />,
    instagram: <FaInstagram className="w-5 h-5" />,
    youtube: <FaYoutube className="w-5 h-5" />,
    tiktok: <FaTiktok className="w-5 h-5" />,
    other: <GoLink className="w-5 h-5" />,
  };

  if (!socials || Object.values(socials).every((value) => !value)) return null;

  return (
    <div className="space-y-2">
      <span className="text-neutral-600">Socials</span>
      <div className="flex space-x-3 mt-1">
        {Object.entries(socials).map(([key, url]) => {
          if (!url) return null;

          const icon = iconMap[key as keyof Socials];
          if (!icon) return null;

          return (
            <div key={key} className="flex items-center justify-center w-10 h-10 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 transition-colors"
                title={key.charAt(0).toUpperCase() + key.slice(1)}
              >
                {icon}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { FollowCompanyButton, OpenJobsJsx, CompanySocialLinks };
