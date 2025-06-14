import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Function to validate application questions dynamically
type Questions = {
  id: string;
  question: string;
  type: "textarea" | "select" | "radio" | "checkbox";
  required: boolean;
  options?: string[];
}
const validateAnswers = (questions: Questions[]) =>
  z
    .record(z.string(), z.union([z.string(), z.array(z.string())]))
    .superRefine((answers, ctx) => {
      for (const q of questions) {
        const value = answers[q.id];

        // Required check
        if (q.required) {
          const isEmpty =
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0);

          if (isEmpty) {
            ctx.addIssue({
              path: [q.id],
              code: z.ZodIssueCode.custom,
              message: "This field is required",
            });
            continue;
          }
        }

        // Type-specific validations
        if (
          (q.type === "select" || q.type === "radio") &&
          typeof value === "string"
        ) {
          if (!q.options?.includes(value)) {
            ctx.addIssue({
              path: [q.id],
              code: z.ZodIssueCode.custom,
              message: "Please select one of the provided options",
            });
          }
        }

        if (q.type === "checkbox" && Array.isArray(value)) {
          if (!value.every((opt) => q.options?.includes(opt))) {
            ctx.addIssue({
              path: [q.id],
              code: z.ZodIssueCode.custom,
              message: "Please select one or more valid options",
            });
          }
        }

        if (q.type === "textarea" && typeof value !== "string") {
          ctx.addIssue({
            path: [q.id],
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid text response",
          });
        }
      }
    });


    export const createApplicationFormSchema = (
      questions: Questions[]
    )=> {
      return z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z
          .string()
          .optional()
          .refine((phone) => {
            if (!phone) return true;
            return parsePhoneNumberFromString(phone, "NG")?.isValid() ?? false;
          }, "Invalid phone number"),
        location: z.string().optional(),
        resumeFile: z
          .instanceof(File, { message: "Resume is required" })
          .refine(
            (file) => file.size <= 2 * 1024 * 1024,
            "Resume file must be less than 2MB"
          )
          .refine(
            (file) => [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type),
            "Resume must be a PDF, DOC, or DOCX file"
          ),
        coverLetter: z.string().optional(),
        answers: validateAnswers(questions),
      });
    };


    export type ApplicationFormType = z.infer<
    ReturnType<typeof createApplicationFormSchema>
  >;