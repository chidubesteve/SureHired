  "use client";

  import Link from "next/link";
  import { useState } from "react";
  import { Button } from "@/components/ui/button";
  import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/config/nav-links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


  type UserType = "candidate" | "employer" | null;

  const ClientHeaderJsx = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userType, setUserType] = useState<UserType>(null); // Replace with actual logic

    return (
      <div className="flex items-center">
        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {!userType && (
            <>
              <Link href="/sign-in">
                <Button variant="outline" className="">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Compact layout only between 756px and 901px */}
        <div className="hidden compact:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Get Started</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 cursor-pointer font-medium space-y-1">
              <DropdownMenuItem className="hover:!bg-primary hover:!text-card">
                <Link href={"/sign-in"}>Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:!bg-primary hover:!text-card">
                <Link href={"/sign-up"}>Get Started</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 cursor-pointer rounded hover:bg-gray-100"
          onClick={() => setIsMenuOpen((prev) => !prev)}
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
                  className="text-neutral-500 font-medium hover:text-foreground"
                >
                  <Link href={link.href} className="cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="border-neutral-200" />
            <div className="pt-4 flex w-full justify-around items-center">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="w-full font-medium min-w-[6.5rem] sm:min-w-36"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full font-medium bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md sm:min-w-36">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ClientHeaderJsx;
