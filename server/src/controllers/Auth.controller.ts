import { getErrorMessage } from "../utils/errorUtils";
import { comparePassword, hashPassword } from "../utils/password";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// same thing as signup
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password, userType } = req.body;
  if (!firstName || !lastName || !email || !userType) {
    res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
    return;
  }
  try {
    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    // hash password
    let hashedPassword: string | undefined;
    // Only hash password if provided (for non-OAuth signups)
    if (password) {
      hashedPassword = await hashPassword(password);
    }
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType: userType,
      },
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userType: newUser.userType,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: getErrorMessage(error),
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password: userPassword } = req.body;
  if (!email || !userPassword) {
    res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await comparePassword(userPassword, user.password!);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const { password, ...userWithOutPassword } = user;
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: userWithOutPassword,
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    res.status(500).json({
      success: false,
      message: "Error signing in user",
      error: getErrorMessage(error),
    });
  }
};
