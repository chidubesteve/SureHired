import { z } from "zod";
const currentYear = new Date().getFullYear();

// Define a reusable URL validation schema - to allow empty strings as well

const domainRegex =
  /^https?:\/\/([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/;

const optionalUrl = z
  .string()
  .trim()
  .transform((val) => {
    if (!val) return ""; // keep empty as-is
    // if not protocol, prepend "https://"
    if (!/^https?:\/\//i.test(val)) {
      return `https://${val}`;
    }
    return val;
  })
  .refine((val) => !val || val === "" || domainRegex.test(val), {
    message: "Enter a valid URL",
  })
  .optional();

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 1 MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .instanceof(File, {
    message: "File must be an image",
  })
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "Invalid image type. Only JPEG, JPG, PNG, and WebP are allowed")
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB`
);
  
export const imageSchema = z.union([fileSchema, z.string().url()])

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.enum(
    [
      "1-10 employees",
      "11-50 employees",
      "51-200 employees",
      "200-500 employees",
      "500+ employees",
    ],
    {
      required_error: "Company size is required",
    }
  ),

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
  logo: imageSchema.optional(),
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
