import { getErrorMessage } from "../utils/errorUtils";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/password";

const prisma = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: getErrorMessage(error),
    });
  }
};  

export const getUserApplications = async (req: Request, res: Response) => {
  const { id } = req.params;
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where: { userId: id },
        include: {
          job: {
            include: { company: true },
          },
        },
        skip,
        take: limit,
        orderBy: { appliedAt: "desc" },
      }),
      prisma.application.count({
        where: { userId: id },
      }),
    ]);
    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user applications",
      error: getErrorMessage(error),
    });
  }
};

export const getUserBookmarks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 3;
  const skip = (page - 1) * limit;
  try {
    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: { userId: id },
        include: {
          job: {
            include: { company: true },
          },
        },
        skip,
        take: limit,
        orderBy: { savedAt: "desc" },
      }),
      prisma.bookmark.count({
        where: { userId: id },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Bookmarks fetched successfully",
      data: bookmarks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user bookmarks",
      error: getErrorMessage(error),
    });
  }
};

export const getFollowedCompanies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 3;
    const skip = (page - 1) * limit;

    const [followed, total] = await Promise.all([
      prisma.userFollowCompany.findMany({
        where: { userId: id },
        include: {
          company: true,
        },
        skip,
        take: limit,
        orderBy: { followedAt: "desc" },
      }),
      prisma.userFollowCompany.count({
        where: { userId: id },
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Followed companies fetched successfully",
      data: followed,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching followed companies:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching followed companies",
      error: getErrorMessage(error),
    });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID missing" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (!user.password) {
      res.status(400).json({
        success: false,
        message: "User has no password, Might be OAuth user",
      });
      return;
    }

    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect current password",
      });
      return;
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      success: false,
      message: "Error updating password",
      error: getErrorMessage(error),
    });
  }
};

export const changeUserFullName = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, firstName, lastName } = req.body;


  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID missing" });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName },
    });

    return res.status(200).json({
      success: true,
      message: "User full name updated successfully",
    });
  } catch (error) {
    console.error("Error updating user full name:", error);
    res.status(500).json({
      success: false,
      message: "Error updating user full name",
      error: getErrorMessage(error),
    });
  }
};
