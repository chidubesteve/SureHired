import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errorUtils";

const prisma = new PrismaClient();

export const getCompanyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        jobs: {
          select: {
            id: true,
            title: true,
            salary: true,
            type: true,
            location: true,
            postedDate: true,
          },
        },
        followers: true,
        socials: true,
        offices: true,
      },
    });

    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Company fetched successfully",
      data: company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching company",
      error: getErrorMessage(error),
    });
  }
};

export const getAllCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const searchQuery = req.query.search as string;
  // filters search
  const industries = req.query.industry as string;
  const sizes = req.query.size as string;
  const workStyles = req.query.workStyle as string;

  try {
    const whereClause: any = {};

    if (searchQuery) {
      whereClause.OR = [
        {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          hqLocation: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          industry: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          tags: {
           hasSome: [searchQuery],
          },
        },
        {
          offices: {
            some: {
              location: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
        },
      ];
    }

    //industry filter
    if (industries) {
      const industryArray = industries.split(",").map((item) => item.trim());
      whereClause.industry = {
        in: industryArray,
      };
    }

    // size filter
    if (sizes) {
      const sizeArray = sizes.split(",").map((item) => item.trim());
      whereClause.size = {
        in: sizeArray,
      };
    }

    // work style filter
    if (workStyles) {
      const workStyleArray = workStyles.split(",").map((item) => item.trim());
      whereClause.workStyle = {
        in: workStyleArray,
      };
    }

    const [companies, totalCompanies] = await Promise.all([
      prisma.company.findMany({
        where: whereClause,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          hqLocation: true,
          industry: true,
          size: true,
          founded: true,
          tags: true,
          _count: {
            select: {
              jobs: {
                where: { status: "Open" },
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      }),
      prisma.company.count({
        where: whereClause,
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      data: companies,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCompanies / limit),
        totalCompanies,
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: getErrorMessage(error),
    });
  }
};
