import { string, z } from 'zod';

export const addressSchema = z.object({
    lineone: z.string(),
    linetwo: z.string().nullable(),
    city: z.string(),
    country: z.string(),
    pincode: z.string().length(6),
})

export const updateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.string().optional(),
  defaultBillingAddress: z.string().optional(),
});
