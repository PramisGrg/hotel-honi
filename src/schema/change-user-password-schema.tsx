import { z } from "zod";

export const ChangeUserPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(2, { message: "Enter your valid password" }),
    newPassword: z.string().min(3, { message: "Enter a valid password" }),
    confirmPassword: z.string().min(3, { message: "Enter a valid password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });
