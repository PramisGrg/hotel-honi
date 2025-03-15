import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string(),
});

export type TAddCategorySchema = z.infer<typeof addCategorySchema>;
