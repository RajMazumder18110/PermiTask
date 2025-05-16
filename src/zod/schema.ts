/** @notice Library imports */
import { z } from "zod";

export const emailSchema = z
  .string()
  .email({ message: "Invalid email format" })
  .transform((val) => val.toLowerCase());

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: emailSchema,
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
