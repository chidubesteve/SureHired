import Image from "next/image";
import React from "react";
import ClientJsx from "./ClientJsx";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* logo */}
        <div className="text-center mb-8 flex justify-center items-center space-x-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[40px]"
          />
          <span className="text-2xl font-bold">SureHired</span>
        </div>

        <ClientJsx />
      </div>
    </div>
  );
};

export default SignIn;
