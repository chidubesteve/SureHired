import React from "react";
import { ClientFormJsx, ClientGoBackButtonJsx } from "./ClientJsx";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - scrollable form */}
      <div className="w-full lg:w-1/2 overflow-y-auto scrollbar-hidden">
        <div className="min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Your form content */}
            <ClientGoBackButtonJsx />
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="w-[40px]"
              />
              <h1 className="text-2xl font-bold text-neutral-900">SureHired</h1>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Create your account
            </h2>
            <p className="!mt-2 text-neutral-600">
              Join thousands of professionals finding their dream jobs
            </p>
            <ClientFormJsx />
          </div>
        </div>
      </div>

      {/* Right side - fixed/sticky image and illustration */}
      <div className="hidden lg:block lg:w-1/2 h-screen bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden relative">
        <div className="absolute inset-0 p-12 group">
          {/* Floating dev guy */}
          <div className="absolute top-2 right-1 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3">
            <Image
              src="/dev-guy.png"
              alt="developer working with laptop"
              width={250}
              height={250}
              quality={100}
              className="w-[230px] object-contain object-center animate-float"
            />
          </div>

          {/* Centered Text */}
          <div className="relative z-10 flex flex-col text-center justify-center text-white h-full">
            <h3 className="text-3xl font-bold mb-6">Join the Future of Work</h3>
            <p className="text-xl text-brand-100 mb-8">
              Connect with top companies and discover opportunities that match
              your skills and ambitions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-4xl font-bold mb-2">50k+</h2>
                <span className="text-brand-200">Active Jobs</span>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">10k+</h2>
                <span className="text-brand-200">Companies</span>
              </div>
            </div>
          </div>

          {/* Floating bottom illustration */}
          <div className="absolute bottom-0 left-2 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3">
            <Image
              src="/Job_interview.webp"
              alt="briefcase and chat"
              width={200}
              height={200}
              quality={100}
              className="w-[200px] object-contain object-center animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
