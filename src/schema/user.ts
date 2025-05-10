import { z } from 'zod';

export const UserSignupSchema = z.object({
    name: z.string().min(4, 'Username must be at least 4 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
});

export const UserloginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
})
