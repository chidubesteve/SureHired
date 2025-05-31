"use client";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuEye, LuEyeOff } from "react-icons/lu";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "./validationSchema";

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
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company: "",
      userType: "candidate",
      agreeToTerms: false,
    },
  });

  const userType = watch("userType");

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form data:", data);
    // Handle submission here
  };

  return (
    <>
      {/* User Type Toggle */}
      <div className="p-1 bg-white rounded-lg border border-neutral-200">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setValue("userType", "candidate")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === "candidate"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setValue("userType", "employer")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === "employer"
                ? "bg-brand-600 text-white"
                : "bg-white text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Employer
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

        {userType === "employer" && (
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
