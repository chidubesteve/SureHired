"use client";
import React from "react";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "../validation/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuPenLine } from "react-icons/lu";
import { useUpdateUserPasswordMutation } from "@/redux/services/user";
import { signOut } from "next-auth/react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

const ChangePasswordModal = ({ open, onOpenChange, userId }: Props) => {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const [updatePassword] = useUpdateUserPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    console.log("Form data:", data);
    try {
      const res = await updatePassword({
        userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || "Password updated successfully");
      } else {
        toast.error(res.message || "Error updating password");
      }
      onOpenChange(false);
      form.reset();

      // logout user after successful password change
      await signOut({ callbackUrl: "/auth/sign-in" });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Invalid current password or server error");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          <LuPenLine className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              {...register("confirmNewPassword")}
            />
            {errors.confirmNewPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              Update Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
