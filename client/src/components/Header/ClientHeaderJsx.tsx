"use client";
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
import { useGetUserProfileQuery } from "@/redux/services/user";

const getUserInitials = (firstName: string, lastName: string) =>
  `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();

const handleSignOut = async () => {
  await signOut({ callbackUrl: "/" });
};

// Centralized menu items based on user type
const getUserMenuItems = (userType: UserType) => {
  if (userType === "CANDIDATE") {
    return [
      { href: "/user/profile", label: "Profile" },
      { href: "/user/profile#applications", label: "Applications" },
    ];
  }
  return [
    { href: "/company/dashboard", label: "Dashboard" },
    { href: "/company/update-profile", label: "Update Profile" },
    { href: "/company/dashboard?tab=manage-jobs", label: "Manage Jobs" },
  ];
};

const ClientHeaderJsx = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { data: userProfileData } = useGetUserProfileQuery(
    session?.user?.id || ""
  );
  console.log("User Profile Data:", userProfileData);

  const menuItems =
    session?.user?.userType &&
    getUserMenuItems(session.user.userType as UserType);

  return (
    <div className="flex items-center">
      {/* Desktop Auth Buttons */}
      {!session?.user && (
        <>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="outline">Sign in</Button>
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
                <DropdownMenuItem>
                  <Link href="/auth/sign-in">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/sign-up">Get Started</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}

      {/* Desktop User Menu */}
      {session?.user && userProfileData && (
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
                      userProfileData?.data.profilePicture ??
                      `https://api.dicebear.com/9.x/adventurer/svg?seed=${userProfileData?.data.firstName}`
                    }
                    alt={`${userProfileData.data.firstName} ${userProfileData.data.lastName}`}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getUserInitials(
                      userProfileData.data.firstName!,
                      userProfileData.data.lastName!
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-md truncate">
                  {userProfileData.data?.firstName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 cursor-pointer font-medium"
              align="end"
            >
              {(Array.isArray(menuItems) ? menuItems : []).map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="hover:!bg-primary hover:!text-card cursor-pointer"
                >
                  <Link href={item.href} className="w-full">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:!bg-destructive hover:!text-destructive-foreground cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Mobile Menu Toggle */}
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
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <hr className="border-neutral-200" />

          {/* Mobile Auth / User Menu */}
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
              {/* User Info */}
              {userProfileData && (
                <>
                  <div className="flex items-center gap-2.5 p-3 bg-accent rounded-lg mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={
                          userProfileData.data?.profilePicture ??
                          `https://api.dicebear.com/9.x/adventurer/svg?seed=${userProfileData.data.firstName}`
                        }
                        alt={`${userProfileData.data.firstName} ${userProfileData.data.lastName}`}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials(
                          userProfileData.data.firstName!,
                          userProfileData.data.lastName!
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-md">
                        {userProfileData.data.firstName} {userProfileData.data.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {session.user.userType}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {/* this is for typescript to know that menuItems is an array */}
                    {(Array.isArray(menuItems) ? menuItems : []).map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                    <Button
                      variant="destructive"
                      className="w-full justify-start mt-2"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientHeaderJsx;
