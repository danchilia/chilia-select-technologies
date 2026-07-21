import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required.")
  .max(254, "Email is too long.")
  .email("Enter a valid email address.");

// 8-72 chars (bcrypt ignores anything past 72 bytes), at least one letter and one number.
const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be 72 characters or fewer.")
  .regex(/[A-Za-z]/, "Password must include at least one letter.")
  .regex(/[0-9]/, "Password must include at least one number.");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(100, "Name is too long."),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
