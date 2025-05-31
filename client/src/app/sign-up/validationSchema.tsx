// validationSchema.ts
import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    company: z.string().optional(),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms",
    }),
    userType: z.enum(["candidate", "employer"]),
  })
  .superRefine((data, ctx) => {
    if (data.userType === "employer" && !data.company?.trim()) {
      ctx.addIssue({
        path: ["company"],
        code: z.ZodIssueCode.custom,
        message: "Company name is required for employers",
      });
    }
  });

export type FormSchemaType = z.infer<typeof formSchema>;
