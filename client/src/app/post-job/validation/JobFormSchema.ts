import { z } from "zod";


export const JobFormSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  salary: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;

        const patternSingle = /^\d{1,3}(,\d{3})*$/;
        const patternRange = /^\d{1,3}(,\d{3})*\s*-\s*\d{1,3}(,\d{3})*$/;

        return patternSingle.test(val.trim()) || patternRange.test(val.trim());
      },
      {
        message:
          "Enter a valid salary or salary range (e.g. 80,000 or 70,000 - 90,000)",
      }
    ),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship"], {
    errorMap: () => {
      return { message: "Please select a valid job type" };
    },
  }),
  experience: z.enum(
    ["Entry-level", "Mid-level", "Senior-level", "Executive"],
    {
      errorMap: () => {
        return { message: "Please select an experience level" };
      },
    }
  ),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.string().min(10, "Please specify some requirements"),
  benefits: z.string().optional(),
  email: z.string().email("Invalid email address"),
  companyWebsite: z.string().url("Enter a valid website URL").optional(),
  applicationMethod: z.enum(["in-app", "external"]),
  applicationUrl: z
    .string()
    .url()
    .optional()
    .refine(
      (val) =>
        !val || val.trim() !== "" || z.string().url().safeParse(val).success,
      {
        message: "Enter a valid URL",
      }
    ),
  applicationQuestions: z
    .array(
      z.object({
        id: z.string(),
        question: z.string().min(1),
        type: z.enum(["textarea", "select", "radio", "checkbox"]),
        required: z.boolean(),
        options: z.array(z.string()).optional(),
      })
    )
    .optional(),
});
    
export type JobFormData = z.infer<typeof JobFormSchema>;