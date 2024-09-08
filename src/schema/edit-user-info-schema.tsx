import { z } from "zod";

export const EditUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least two character long" }),
  phoneNumber: z.string().min(8, { message: "Enter a valid number " }),
  username: z.string().min(2, { message: "Enter a valid username" }),
});
