"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useOAuthErrorToast = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    let errorMessage = "An error occurred during authentication";

    switch (error) {
      case "OAuthAccountNotLinked":
        errorMessage =
          "An account with this email already exists. Please sign in using the same method you used during registration.";
        break;
      case "OAuthCreateAccount":
        errorMessage =
          "Unable to get your name from the provider. Please try signing up manually.";
        break;
      case "EmailCreateAccount":
        errorMessage = "Unable to create account with this email.";
        break;
      case "Callback":
        errorMessage = "Authentication failed. Please try again.";
        break;
      case "OAuthCallback":
        errorMessage = "OAuth provider returned an error. Please try again.";
        break;
      case "AccessDenied":
        errorMessage = "Access denied. Please grant the necessary permissions.";
        break;
      default:
        errorMessage = `Authentication error: ${error}`;
      }
      
      toast.error(errorMessage, { duration: 5000 });

      // clean url
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("error");
      window.history.replaceState({}, "", newUrl.toString());
  }, [pathname, searchParams]);
};
