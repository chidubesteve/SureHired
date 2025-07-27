import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReduxProvider } from "@/redux/provider";
import AuthContext from "./AuthContext";
import { getCurrentUser } from "@/lib/actions/getUserSession";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentUser();
  console.log("Session from layout: ", session)
  return (

    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthContext session={session}>
          <ReduxProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ReduxProvider>
        </AuthContext>
      </body>
    </html>
  );
}
