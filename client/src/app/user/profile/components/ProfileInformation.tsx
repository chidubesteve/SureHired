"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { ProfileSchema, ProfileSchemaType } from "../validation/ProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LuSave, LuX, LuPenLine } from "react-icons/lu";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from "sonner";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
  };
}
export const NameProfileInfoSection = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.firstName} || ${user.profilePicture}`;

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const { register, handleSubmit, reset, formState } = form;

  console.log("Form state:", formState);
  const handleUpdateProfile = async (
    updatedData: Partial<ProfileSchemaType>
  ) => {
    // try {
    //   const res = await fetch("/api/user/profile", {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedData),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Failed to update profile");
    //   }

    //   const data = await res.json();
    try {
  
      console.log("Profile updated:", updatedData);
      
      toast.success("Profile updated successfully");
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
    console.log("Form data submitted:", data); // Log form data
    await handleUpdateProfile(data);
    setIsEditing(false);
  };
  return (
    <>
      {" "}
      {/* profile picture and Name Field */}
      <div className="flex flex-col gap-2">
        <Image
          src={avatarUrl}
          alt={`${user.firstName}'s avatar`}
          width={72}
          height={72}
          className="w-[72px] h-[72px] rounded-full bg-gray-200 mb-2"
        />
        {!isEditing ? (
          <>
            <Label htmlFor="name">Full Name</Label>
            <div className="flex items-center justify-between mt-1 gap-2">
              <span className="text-neutral-900">
                {user.firstName} {user.lastName}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                title="Edit Name"
              >
                <LuPenLine className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex-col  mt-3">
            <div className="flex space-x-2">
              <div>
                <Label className="text-xs">First Name</Label>
                <Input {...register("firstName")} />
              </div>
              <div>
                <Label className="text-xs">Last Name</Label>
                <Input {...register("lastName")} />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                type="submit"
                size="sm"
                disabled={!formState.isValid || formState.isSubmitting}
                className="hover:cursor-pointer disabled:!cursor-not-allowed"
              >
                <LuSave className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
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
  email: string;
};

export const PasswordProfileInfoSection = ({ email }: PasswordProps) => {
  const [open, setOpen] = useState(false);
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
            email={email}
          />
        </div>
      </div>
    </>
  );
};
