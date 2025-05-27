export const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Post a Job", href: "/post-job" },
  { label: "Salary Guide", href: "/salary-guide" },
];

export const FOOTER_LINKS = {
  jobSeekers: {
    title: "For Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "Salary Guide", href: "/salary-guide" },
      { label: "Career Resources", href: "/resources" },
    ],
  },
  employers: {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Pricing", href: "/pricing" },
      { label: "Browse Talent", href: "/talent" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  sureHired: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
} as const;
  
