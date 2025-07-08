import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "SureHired | Get hired",
  description:
    "SureHired is your go-to platform for connecting top talent with exciting career opportunities. Whether you're a job seeker looking for your dream role or an employer seeking the perfect candidate, SureHired delivers a seamless, modern job-board experience. Find your future, hire with confidence – SureHired!",
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
        <ReduxProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
