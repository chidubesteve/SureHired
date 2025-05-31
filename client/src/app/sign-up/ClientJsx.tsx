"use client";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

type UserType = "candidate" | "employer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  agreeToTerms: boolean;
  userType: UserType;
};

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  company: "",
  userType: "candidate",
  agreeToTerms: false,
};

const ClientFormJsx = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up form data: ", formData);
  };
  return (
    <>
      {/* User Type Toggle */}
      <div className="p-1 bg-white rounded-lg border border-neutral-200">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setFormData({ ...formData, userType: "candidate" })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              formData.userType === "candidate"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Job Seeker
          </button>
          <button
            onClick={() => setFormData({ ...formData, userType: "employer" })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              formData.userType === "employer"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Employer
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
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
              required
              name="firstName"
              className="search-input"
              value={formData.firstName}
              id="firstName"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
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
              name="lastName"
              required
              className="search-input"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
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
            name="email"
            required
            className="search-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {formData.userType === "employer" && (
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
              name="company"
              required
              className="search-input"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
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
              name="password"
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
        </div>

        {/* terms */}
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-neutral-300 rounded"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({
                ...formData,
                agreeToTerms: e.target.checked,
              })
            }
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
        </div>
        <Button
          type="submit"
          className="w-full font-semibold py-3 text-lg bg-brand-600 hover:bg-brand-700"
        >
          Create Account
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
          <Button variant={"outline"} className="w-full">
            <FaGoogle /> Google
          </Button>
          <Button variant={"outline"} className="w-full">
            <FaLinkedin /> LinkedIn
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-neutral-600">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export { ClientGoBackButtonJsx, ClientFormJsx };
