import { z } from 'zod';

export const addressSchema = z.object({
    lineone: z.string(),
    linetwo: z.string().nullable(),
    city: z.string(),
    country: z.string(),
    pincode: z.string().length(6),
})