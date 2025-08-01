    import { z } from 'zod';

    export const ProfileSchema = z.object({
        firstName: z.string().min(1, 'First name is required').max(50, 'First name must be at most 50 characters'),
        lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be at most 50 characters'),
    })

    export type ProfileSchemaType = z.infer<typeof ProfileSchema>;