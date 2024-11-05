import z from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const InventorySchema = z.object({
  name: z.string().min(1, "Please enter a valid inventory name"),
  quantity: z.string().min(1, "Quantity can't be empty"),
  unit: z.string().min(1, "Unit can't be empty"),
  price: z.string().min(1, "Enter a valid price"),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  description: z.string().min(2, "Enter description"),
});

export type InventoryFormData = z.infer<typeof InventorySchema>;
