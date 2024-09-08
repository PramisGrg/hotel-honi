import { z } from "zod";

const MAX_SIZE_IMAGE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least two character long" }),
  phoneNumber: z.string().min(8, { message: "Enter a valid number " }),
  username: z.string().min(3, { message: "enter a valid username" }),
  image: z
    .any()
    .refine((file) => file, { message: "File not selected" })
    .refine((file) => file?.size <= MAX_SIZE_IMAGE, {
      message: "Max image size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg and .png formats are supported.",
    }),
});
