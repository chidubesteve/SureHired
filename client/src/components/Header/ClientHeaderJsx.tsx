"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuMenu, LuX } from "react-icons/lu";
import { NAV_LINKS } from "@/config/nav-links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { UserType } from "@/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const getUserInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const handleSignOut = async () => {
  await signOut({ callbackUrl: "/" });
};

const RenderUserDropdownItems = () => {
  const { data: session } = useSession();
  if (!session?.user) return null;

  const userType = session.user.userType as UserType;

  return (
    <>
      {userType === "CANDIDATE" ? (
        <>
          <DropdownMenuItem className="hover:!bg-primary hover:!text-card cursor-pointer">
            <Link href="/user/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!bg-primary hover:!text-card cursor-pointer">
            <Link href="/user/profile#applications" className="w-full">
              Applications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:!bg-destructive hover:!text-destructive-foreground cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <DropdownMenuItem className="hover:!bg-primary hover:!text-card cursor-pointer">
            <Link href="/dashboard" className="w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!bg-primary hover:!text-card cursor-pointer">
            <Link href="/company-profile" className="w-full">
              Company Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!bg-primary hover:!text-card cursor-pointer">
            <Link href="/manage-jobs" className="w-full">
              Manage Jobs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:!bg-destructive hover:!text-destructive-foreground cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </DropdownMenuItem>
        </>
      )}
    </>
  );
};

const ClientHeaderJsx = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();


  console.log("Session: ", session);
    console.log("Session status: ", status);

  return (
    <div className="flex items-center">
      <div className="">
        {!session?.user && (
          <>
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/auth/sign-in">
                <Button variant="outline" className="">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>

            <div className="hidden compact:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Get Started</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 cursor-pointer font-medium space-y-1">
                  <DropdownMenuItem className="hover:!bg-primary hover:!text-card">
                    <Link href={"/auth/sign-in"}>Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:!bg-primary hover:!text-card">
                    <Link href={"/auth/sign-up"}>Get Started</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* User Profile Button - Show when authenticated */}
      {session && session.user && (
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2.5 px-3 py-2 h-auto hover:bg-accent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      session.user.profilePicture ??
                      `https://api.dicebear.com/9.x/adventurer/svg?seed=${session.user.firstName}`
                    }
                    alt={`${session.user.firstName} ${session.user.lastName}`}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getUserInitials(
                      session.user.firstName!,
                      session.user.lastName!
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-md truncate">
                  {session.user.firstName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 cursor-pointer font-medium"
              align="end"
            >
              <RenderUserDropdownItems />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 cursor-pointer rounded hover:bg-gray-100"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <LuX className="w-6 h-6" />
        ) : (
          <LuMenu className="w-6 h-6" />
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
          {/* Mobile Auth Section */}
          {!session?.user ? (
            <div className="pt-4 flex w-full justify-around items-center">
              <Link href="/auth/sign-in">
                <Button
                  variant="outline"
                  className="w-full font-medium min-w-[6.5rem] sm:min-w-36"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="w-full font-medium bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md sm:min-w-36">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4">
              {/* Mobile User Profile */}
              <div className="flex items-center gap-2.5 p-3 bg-accent rounded-lg mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      session.user.profilePicture ??
                      `https://api.dicebear.com/9.x/adventurer/svg?seed=${session.user.firstName}`
                    }
                    alt={`${session.user.firstName} ${session.user.lastName}`}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials(
                      session.user.firstName!,
                      session.user.lastName!
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-md">
                    {session.user.firstName} {session.user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {session.user.userType}
                  </p>
                </div>
              </div>
              {/* Mobile User Menu Items */}
              <div className="flex flex-col space-y-2">
                {session.user.userType === "CANDIDATE" && (
                  <>
                    <Link href="/user/profile">
                      <Button variant="ghost" className="w-full justify-start">
                        Profile
                      </Button>
                    </Link>
                    <Link href="/user/profile#applications">
                      <Button variant="ghost" className="w-full justify-start">
                        Applications
                      </Button>
                    </Link>
                  </>
                )}

                {session.user.userType === "EMPLOYER" && (
                  <>
                    <Link href="/company/dashboard">
                      <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/company/update-profile">
                      <Button variant="ghost" className="w-full justify-start">
                        Company Profile
                      </Button>
                    </Link>
                    <Link href="/company/dashboard?tab=manage-jobs">
                      <Button variant="ghost" className="w-full justify-start">
                        Manage Jobs
                      </Button>
                    </Link>
                  </>
                )}

                <Button
                  variant="destructive"
                  className="w-full justify-start mt-2"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientHeaderJsx;
