import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errorUtils";

const prisma = new PrismaClient();

export const getFeaturedJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobs = await prisma.job.findMany({
      where: { isFeatured: true },
      select: {
        id: true,
        title: true,
        salary: true,
        type: true,
        location: true,
        tags: true,
        postedDate: true,
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Featured Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured jobs",
      error: getErrorMessage(error),
    });
  }
};

export const getAllJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  try {
    const [jobs, totalJobs] = await Promise.all([
      prisma.job.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          salary: true,
          type: true,
          location: true,
          description: true,
          tags: true,
          postedDate: true,
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      }),
      prisma.job.count(),
    ]);
    res.status(200).json({
      success: true,
      message: "All Jobs fetched successfully",
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all jobs",
      error: getErrorMessage(error),
    });
  }
};
