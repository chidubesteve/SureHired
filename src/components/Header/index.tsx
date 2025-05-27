"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/nav-links";

const Header = () => {
  type UserType = "candidate" | "employer" | null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);

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
          <nav className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map((link, id) => (
              <Link
                key={id}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Login */}
            {!userType && (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" className="hover:text-foreground">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}

          <button
            className="md:hidden p-2 cursor-pointer rounded hover:bg-gray-100"
            onClick={() => setIsMenuOpen((prevState) => !prevState)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden w-full bg-card p-4 border-neutral-200 absolute top-16 right-0 rounded-b-2xl inline shadow">
              <hr className="border-neutral-200" />
              <ul className="list-none flex flex-col space-y-4 my-4">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.href}
                    className="text-muted-foreground font-medium"
                  >
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="border-neutral-200" />
              <div className="pt-4 flex w-full justify-around items-center">
                <Link href={"/sign-in"}>
                  <Button
                    variant="outline"
                    className="w-full font-medium min-w-[6.5rem] sm:min-w-36"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="w-full font-medium bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md sm:min-w-36">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
