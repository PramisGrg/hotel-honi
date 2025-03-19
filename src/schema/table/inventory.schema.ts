import z from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const addInventorySchema = z.object({
  name: z.string().min(1, "Please enter a valid inventory name"),
  quantity: z.string().min(1, "Quantity can't be empty"),
  unit: z.string().min(1, "Unit can't be empty"),
  price: z.string().min(1, "Price field can't be empty"),
  image: z
    .any()
    .refine(
      (files) => files.length > 0 && files[0].size <= MAX_FILE_SIZE,
      `Max image size is 2MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  description: z.string().min(2, "Enter description"),
});

export type TAddInventorySchema = z.infer<typeof addInventorySchema>;
