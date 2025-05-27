"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_LINKS } from "@/config/nav-links";
import ClientHeaderJsx from "./ClientHeaderJsx";

const Header = () => {
  return (
    <header className="border-b border-neutral-200 sticky top-0 z-50 bg-card">
      <div className="max-w-7xl mx-auto px-4 flex sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center w-full">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              alt="SureHired logo"
              src={"/logo.png"}
              width={100}
              height={100}
              className="w-[35px]"
            />
            <span className="text-xl font-bold text-foreground">SureHired</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 flex-nowrap">
            {NAV_LINKS.map((link, id) => (
              <Link
                key={id}
                href={link.href}
                className="text-neutral-500 hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Interactive client-side logic */}
          <ClientHeaderJsx />
        </div>
      </div>
    </header>
  );
};

export default Header;
