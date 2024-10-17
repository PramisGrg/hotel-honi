import z from "zod";
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const DishesSchema = z.object({
  name: z.string().min(1, "Enter a valid dish name"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(2, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type DishesType = z.infer<typeof DishesSchema>;
