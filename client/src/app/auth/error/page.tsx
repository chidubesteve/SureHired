"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SVGComponent from "./error-svg";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorType: string | null) => {
    switch (errorType) {
      case "OAuthAccountNotLinked":
        return {
          title: "Account Already Exists",
          message:
            "An account with this email address already exists. Please sign in using your original method (email/password, Google, or LinkedIn).",
          suggestion:
            "Try signing in with the method you originally used to create your account.",
        };
      case "OAuthCreateAccount":
        return {
          title: "Unable to Create Account",
          message:
            "We couldn't create your account using this OAuth provider. This might be due to missing information from the provider.",
          suggestion:
            "Please try signing up manually with your email and password.",
        };
      case "EmailCreateAccount":
        return {
          title: "Email Account Creation Failed",
          message: "We couldn't create an account with this email address.",
          suggestion:
            "Please check your email address and try again, or contact support if the problem persists.",
        };
      case "Callback":
        return {
          title: "Authentication Failed",
          message: "There was an error during the authentication process.",
          suggestion:
            "Please try signing in again. If the problem persists, clear your browser cookies and try again.",
        };
      case "OAuthCallback":
        return {
          title: "OAuth Provider Error",
          message:
            "The OAuth provider (Google or LinkedIn) returned an error during authentication.",
          suggestion: "Please try again or use a different sign-in method.",
        };
      case "AccessDenied":
        return {
          title: "Access Denied",
          message:
            "You denied access to the required permissions, or there was an authorization error.",
          suggestion: "Please grant the necessary permissions and try again.",
        };
      case "Configuration":
        return {
          title: "Configuration Error",
          message:
            "There's a configuration issue with the authentication system.",
          suggestion: "Please contact support for assistance.",
        };
      default:
        return {
          title: "Authentication Error",
          message: error
            ? `Authentication error: ${error}`
            : "An unknown authentication error occurred.",
          suggestion:
            "Please try signing in again or contact support if the problem persists.",
        };
    }
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <SVGComponent />
          </div>

          <h1 className="text-xl font-semibold text-neutral-900 mb-2">
            {errorInfo.title}
          </h1>

          <p className="text-neutral-600 mb-4">{errorInfo.message}</p>

          <p className="text-sm text-neutral-500 mb-6">
            {errorInfo.suggestion}
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/sign-in">Try Signing In Again</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/sign-up">Create New Account</Link>
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          {error === "OAuthAccountNotLinked" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Need Help?
              </h3>
              <p className="text-xs text-blue-800">
                If you can&apos;t remember which method you used to create your
                account, try signing in with your email and password first. You
                can also check your email for previous sign-in confirmations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
