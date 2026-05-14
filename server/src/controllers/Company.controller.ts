import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errorUtils";
import { parseJsonFieldsIfNeeded } from "../utils/parseJsonFields";

const prisma = new PrismaClient();

export const getCompanyById = async (
  req: Request,
  res: Response,
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
  res: Response,
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

export const createCompany = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log("User ID from query:", userId);
  console.log("req.query:", req.query);
  console.log("req.params:", req.params);
  // should i validate the sessionToken too

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
    return;
  }
  try {
    const {
      name,
      industry,
      description,
      mission,
      website,
      hqLocation,
      offices,
      size,
      founded,
      workStyle,
      tags,
      benefits,
      values,
      socials,
    } = req.body;
    if (
      !name ||
      !industry ||
      !description ||
      !mission ||
      !website ||
      !hqLocation ||
      !size ||
      !founded ||
      !workStyle ||
      !tags
    ) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }

    const newlyCreatedCompany = await prisma.company.create({
      data: {
        name,
        industry,
        description,
        mission,
        website,
        hqLocation,
        offices:
          offices && offices.length > 0
            ? {
                create: offices,
              }
            : undefined,
        size,
        founded,
        workStyle,
        tags,
        benefits,
        values,
        socials:
          socials && Object.keys(socials).some((key) => socials[key])
            ? {
                create: socials,
              }
            : undefined,
        employer: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // assign the companyId to the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        companyId: newlyCreatedCompany.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      success: false,
      message: "Error creating company",
      error: getErrorMessage(error),
    });
  }
};

export const updateCompany = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { companyId } = req.params; // updating based on company ID
  // TODO: in prod, change base url in .env to deployed domain
  const baseUrl = process.env.BASE_URL || "http://localhost:8000";
  const logoPath = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;

  console.log("req.file:", req.file);
  console.log("companyId from params:", companyId);
  console.log("Logo Path:", logoPath);

  if (!companyId) {
    return res.status(400).json({
      success: false,
      message: "Company ID is required",
    });
  }

  try {
    const {
      name,
      industry,
      description,
      mission,
      website,
      hqLocation,
      size,
      founded,
      workStyle,
      ...rest
    } = req.body;

    // Parse fields that are expected to be arrays or objects
    const { offices, benefits, values, socials, tags } =
      parseJsonFieldsIfNeeded(rest, [
        "offices",
        "benefits",
        "values",
        "socials",
        "tags",
      ]);

    // Optionally validate required fields
    if (
      !name ||
      !industry ||
      !description ||
      !mission ||
      !website ||
      !hqLocation ||
      !size ||
      !founded ||
      !workStyle ||
      !tags
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    console.log("socials data before cleaning:", socials);
    console.log("offices data before cleaning:", offices);

    // clean socials data to remove id and companyId if present (to avoid conflicts)
    //
    const cleanSocials = socials ? (({ id, companyId, ...rest }) => rest)(socials) : undefined;

    // // clean offices data to remove id and companyId if present (to avoid conflicts)
    // let officesData = undefined;
    // if (offices && offices.length > 0) {
    //   const cleanedOffices = offices.map((office: any) => {
    //     const { id, companyId, ...cleanedOffice } = office;
    //     return cleanedOffice;
    //   });
    //   officesData = {
    //     deleteMany: {}, // remove existing offices
    //     create: cleanedOffices,
    //   };
    // }

    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        name,
        industry,
        description,
        mission,
        website,
        logo: logoPath || undefined, // only update if a new file is uploaded
        hqLocation,
        size,
        founded: parseInt(founded, 10), // ensure founded is a number
        workStyle,
        tags: tags,
        benefits,
        values,
        // Replace socials if passed, else keep existing
        socials:
          cleanSocials && Object.keys(cleanSocials).some(Boolean)
            ? {
                upsert: {
                  where: { companyId: companyId },
                  create: cleanSocials,
                  update: cleanSocials,
                },
              }
            : undefined,
        // Replace offices if passed
        offices:
          offices && offices.length > 0
            ? {
                deleteMany: {}, // remove existing offices
                create: offices.map(({ id, companyId, ...rest }: any) => rest),
              }
            : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({
      success: false,
      message: "Error updating company",
      error: getErrorMessage(error),
    });
  }
};

