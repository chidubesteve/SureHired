import { z } from "zod";
const currentYear = new Date().getFullYear();

// Define a reusable URL validation schema - to allow empty strings as well
const optionalUrl = z
  .string()
  .trim()
  .refine((val) => !val || val === "" || z.string().url().safeParse(val).success, {
    message: "Enter a valid URL",
  })
  .optional();

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  founded: z
    .number({
      required_error: "Founded year is required",
      invalid_type_error: "Founded year must be a number",
    })
    .int("Founded year must be an whole number")
    .min(1800, "Founded year must be 1800 or later")
    .max(
      currentYear,
      `Founded year cannot be in the future (max: ${currentYear})`
    ),
  hqLocation: z.string().min(1, "HQ Location is required"),
  website: z.string().url("Invalid website URL"),
  description: z.string().min(15, "Description is required"),
  mission: z.string().min(15, "Mission is required"),
  workStyle: z.enum(["Remote", "Hybrid", "Onsite"]),
  tags: z
    .array(z.string())
    .min(1, "At least one industry tag is required")
    .max(3, "Maximum 3 tags allowed"),
  values: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  offices: z
    .array(
      z.object({
        location: z.string(),
        address: z.string(),
        isHeadquarters: z.boolean(),
      })
    )
    .optional(),
  socials: z
    .object({
      linkedin: optionalUrl,
      github: optionalUrl,
      twitter: optionalUrl,
      facebook: optionalUrl,
      instagram: optionalUrl,
      youtube: optionalUrl,
      tiktok: optionalUrl,
      other: optionalUrl,
    })
    .optional(),
});

export type CompanySchemaType = z.infer<typeof companySchema>;
