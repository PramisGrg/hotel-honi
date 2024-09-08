import { z } from "zod";

export const ResetPasswordSchema = z.object({
  phoneNumber: z.string().min(8, { message: "Enter a valid number " }),
});
