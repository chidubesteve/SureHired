import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";



export const metadata: Metadata = {
  title: "SureHired | Get hired",
  description:
    "SureHired is your go-to platform for connecting top talent with exciting career opportunities. Whether you're a job seeker looking for your dream role or an employer seeking the perfect candidate, SureHired delivers a seamless, modern job-board experience. Browse thousands of jobs with powerful search and filter tools, apply with ease, or post openings to attract qualified candidates. Candidates can sign up with LinkedIn, GitHub, or Google, manage their profiles, and track applications, while employers can create detailed job listings and manage applicants through an intuitive dashboard. With a sleek, responsive design and secure checkout powered by Lemon Squeezy (or Stripe) for job postings, SureHired ensures a professional and efficient experience for all users. Find your future, hire with confidence – SureHired!",
  icons: {
    icon: "/favicon.ico", // default
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <TooltipProvider>

        {children}
        </TooltipProvider>
        <Toaster richColors/>
      </body>
    </html>
  );
}
