"use server";
import { auth } from "@/app/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session;
}
