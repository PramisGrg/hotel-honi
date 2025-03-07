import z from "zod";

export const resetPasswordSchema = z.object({
  phoneNumber: z.string().min(3, "Enter a valid Phone Number"),
});

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
