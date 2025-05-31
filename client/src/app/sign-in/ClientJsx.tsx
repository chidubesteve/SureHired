"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import formSchema, { FormSchemaType } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

const ClientJsx = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log("Form data:", data);
    // Handle submission here
  };
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-neutral-900">
          Welcome back
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <LuEyeOff className="w-4 h-4" />
                ) : (
                  <LuEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-neutral-300" />
              <span className="text-sm text-neutral-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-brand-600 hover:text-brand-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button">
            <FaGoogle className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button variant="outline" type="button">
            <FaLinkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>

        <div className="text-center">
          <span className="text-neutral-600">Don&apos;t have an account? </span>
          <Link
            href="/sign-up"
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientJsx;
