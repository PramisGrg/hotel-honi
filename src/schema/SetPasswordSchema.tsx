import { z } from "zod";

export const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 character long" }),
    confirmpassword: z.string().min(5, { message: "Password do not match" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });
