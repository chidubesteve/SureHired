"use server";
import { auth } from "@/app/auth";

export async function getCurrentUser() {
  const session = await auth();
  console.log("session: ", session);
  return session;
}
