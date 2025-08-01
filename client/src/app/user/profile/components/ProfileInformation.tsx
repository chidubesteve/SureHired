"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import {
  ProfileSchema,
  type ProfileSchemaType,
} from "../validation/ProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LuSave, LuX, LuPenLine } from "react-icons/lu";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from "sonner";
import type { Session } from "next-auth";
import {
  useChangeUserFullNameMutation,
  useGetUserProfileQuery,
} from "@/redux/services/user";
import FetchingError from "@/components/DataFetching/FetchingError";

interface Props {
  userProps: Session["user"];
}

// Skeleton component for the name section
const NameSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    {/* Avatar skeleton */}
    <Skeleton className="w-[72px] h-[72px] rounded-full mb-2" />

    {/* Name field skeleton */}
    <div>
      <Skeleton className="h-4 w-16 mb-1" /> {/* Label */}
      <div className="flex items-center justify-between mt-1 gap-2">
        <Skeleton className="h-5 w-32" /> {/* Name text */}
        <Skeleton className="h-8 w-8 rounded" /> {/* Edit button */}
      </div>
    </div>
  </div>
);

export const NameProfileInfoSection = ({ userProps }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading, error } = useGetUserProfileQuery(userProps.id);
  const [changeUserFullName, { isLoading: isUpdating }] =
    useChangeUserFullNameMutation();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const { register, handleSubmit, reset, formState } = form;

  if (error) {
    return <FetchingError message={"Error fetching user profile"} />;
  }

  // Show skeleton while loading
  if (isLoading) {
    return <NameSectionSkeleton />;
  }

  const avatarUrl =
    user?.profilePicture ||
    `https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.firstName}`;

  const handleUpdateProfile = async (updatedData: ProfileSchemaType) => {
    try {
      const res = await changeUserFullName({
        userId: user!.id,
        ...updatedData,
      }).unwrap();
      console.log("Profile updated:", updatedData);
      toast.success(res.message || "Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const onSubmit = async (data: ProfileSchemaType) => {
    await handleUpdateProfile(data);
    setIsEditing(false);
  };

  return (
    <>
      {/* profile picture and Name Field */}
      <div className="flex flex-col gap-2">
        <Image
          src={avatarUrl || "/placeholder.svg"}
          alt={`${user?.firstName}'s avatar`}
          width={72}
          height={72}
          className="w-[72px] h-[72px] rounded-full bg-gray-200 mb-2"
        />
        {!isEditing ? (
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="flex items-center justify-between mt-1 gap-2">
              <span className="text-neutral-900">
                {user?.firstName} {user?.lastName}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                title="Edit Name"
                disabled={isUpdating}
              >
                <LuPenLine className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex-col mt-3">
            <div className="flex space-x-2">
              <div>
                <Label className="text-xs">First Name</Label>
                <Input {...register("firstName")} disabled={isUpdating} />
              </div>
              <div>
                <Label className="text-xs">Last Name</Label>
                <Input {...register("lastName")} disabled={isUpdating} />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                type="submit"
                size="sm"
                disabled={
                  !formState.isValid || formState.isSubmitting || isUpdating
                }
                className="hover:cursor-pointer disabled:!cursor-not-allowed"
              >
                {isUpdating ? (
                  <Skeleton className="w-4 h-4" />
                ) : (
                  <LuSave className="w-4 h-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                <LuX className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

type PasswordProps = {
  userId: string;
  isLoading?: boolean;
};

// Skeleton component for the password section
const PasswordSectionSkeleton = () => (
  <div>
    <Skeleton className="h-4 w-16 mb-1" /> {/* Label */}
    <div className="flex items-center justify-between mt-1 gap-2 text-center">
      <Skeleton className="h-5 w-16" /> {/* Password dots */}
      <Skeleton className="h-8 w-20 rounded" /> {/* Change password button */}
    </div>
  </div>
);

export const PasswordProfileInfoSection = ({
  userId,
  isLoading,
}: PasswordProps) => {
  const [open, setOpen] = useState(false);

  // Show skeleton while loading
  if (isLoading) {
    return <PasswordSectionSkeleton />;
  }

  return (
    <>
      {/* Password Field */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center justify-between mt-1 gap-2 text-center">
          <span className="text-neutral-900">********</span>
          <ChangePasswordModal
            open={open}
            onOpenChange={setOpen}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
};
