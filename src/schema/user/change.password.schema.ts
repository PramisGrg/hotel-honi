import z from "zod";

export const changeUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(3, "enter your current password"),
    newPassword: z.string().min(3, "enter your new password"),
    confirmPassword: z.string().min(3, "confirm your new passwor"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TChangeUserPasswordSchema = z.infer<
  typeof changeUserPasswordSchema
>;
