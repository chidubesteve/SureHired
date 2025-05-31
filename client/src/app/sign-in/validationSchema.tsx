import { z } from "zod";

const formSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

export default formSchema;
export type FormSchemaType = z.infer<typeof formSchema>;