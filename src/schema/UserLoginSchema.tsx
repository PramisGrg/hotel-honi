import { z } from "zod";

export const userLoginSchema = z.object({
  phoneNumber: z.string().min(8, { message: "Enter a valid number " }),
  password: z
    .string()
    .min(5, { message: "Phone number and password don't match" }),
});
