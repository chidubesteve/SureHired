"use client";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "./validationSchema";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { useOAuthErrorToast } from "@/hooks/useOAuthErrorToast";
import { useSignUpMutation } from "@/redux/services/auth";

const ClientGoBackButtonJsx = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"link"}
      className="text-brand-600 hover:text-brand-700 font-semibold inline-flex items-center !px-1"
    >
      <LuArrowLeft className="w-4 h-4 mr-1" />
      Go Back
    </Button>
  );
};

const ClientFormJsx = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useOAuthErrorToast(); // handles OAuth errors
  const [signUp, { error }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      userType: "CANDIDATE", // default user type
      agreeToTerms: false,
    },
  });
  const userType = watch("userType");

  // to read userType from URL - necessary if page reloads or on initial load
  useEffect(() => {
    const userTypeParam = searchParams.get("userType") as
      | "EMPLOYER"
      | "CANDIDATE";
    if (userTypeParam === "EMPLOYER") {
      setValue("userType", "EMPLOYER");
    } else {
      setValue("userType", "CANDIDATE"); // fallback
    }
  }, [searchParams, setValue]);

  const handleUserTypeChange = (type: "CANDIDATE" | "EMPLOYER") => {
    setValue("userType", type); // update RHF state

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("userType", type);
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const handleOAuthSignIn = async (provider: "google" | "linkedin") => {
    try {
      setIsOAuthLoading(true);

      const result = await signIn(provider, {
        redirect: false,
        redirectTo:
          userType === "EMPLOYER" ? "/company/update-profile" : "/jobs",
      });
      if (result?.ok && result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsOAuthLoading(false);
    }
  };

  const onSubmit = async (data: FormSchemaType) => {
    console.log("Form data:", data);
    // Handle submission here
    setSubmitted(true); // trigger submit message
    try {
      const result = await signUp(data).unwrap();
      console.log("Result: ", result);
      toast.success("Registration Successful");
      // Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        userType,
        redirect: false,
      });

      if (signInResult?.ok) {
        // Redirect based on userType
        if (result?.data?.userType === "EMPLOYER") {
          const companyQuery = data.company
            ? `?company=${encodeURIComponent(data.company)}`
            : "";
          router.push(`/company/update-profile${companyQuery}`);
        } else {
          router.push("/jobs");
        }
      } else {
        // registration successful, but sign-in failed
        toast.info("Registration successful! Please sign in.");
        reset();
        router.push("/auth/sign-in");
      }

      if (error) {
        console.error("Error during sign up api call:", error);
        throw new Error("User registration failed!");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error(
        error instanceof Error ? error.message : "User registration failed!"
      );
    } finally {
      setSubmitted(false); // reset after submission
    }
  };
  Cookies.set("userType", userType);

  return (
    <>
      {/* User Type Toggle */}
      <div className="p-1 bg-white rounded-lg border border-neutral-200">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => handleUserTypeChange("CANDIDATE")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === "CANDIDATE"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => {
              handleUserTypeChange("EMPLOYER");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === "EMPLOYER"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            EMPLOYER
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              First name
            </label>
            <input
              type="text"
              className="search-input"
              id="firstName"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              className="search-input"
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="search-input"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {userType === "EMPLOYER" && (
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Company name
            </label>
            <input
              id="company"
              type="text"
              className="search-input"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id="password"
              className="search-input pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {" "}
              {showPassword ? (
                <LuEyeOff className="h-5 w-5 text-neutral-400" />
              ) : (
                <LuEye className="h-5 w-5 text-neutral-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* terms */}
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-neutral-300 rounded"
            {...register("agreeToTerms", { required: true })} // Add required validation
          />
          <label
            htmlFor="terms"
            className="ml-2 block text-sm text-neutral-600"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-brand-600 hover:text-brand-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-brand-600 hover:text-brand-700"
            >
              Privacy Policy
            </Link>
          </label>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full font-semibold py-3 text-lg bg-brand-600 hover:bg-brand-700"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Account"}
        </Button>
      </form>

      {/* social sign up */}

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-50 text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant={"outline"}
            className="w-full"
            onClick={() => handleOAuthSignIn("google")}
            disabled={isOAuthLoading || isSubmitting}
          >
            <FaGoogle /> {isOAuthLoading ? "Connecting..." : "Google"}
          </Button>
          <Button
            variant={"outline"}
            className="w-full"
            disabled={isOAuthLoading || isSubmitting}
            onClick={() => handleOAuthSignIn("linkedin")}
          >
            <FaLinkedin /> {isOAuthLoading ? "Connecting..." : "LinkedIn"}
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export { ClientGoBackButtonJsx, ClientFormJsx };
