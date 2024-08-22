import { z } from "zod";

export const userRegisterSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Name must be at least two character long" }),
  phonenumber: z.string().min(8, { message: "Enter a valid number " }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 character long" }),
  confirmpassword: z.string().min(5, { message: "Enter a valid password" }),
});
