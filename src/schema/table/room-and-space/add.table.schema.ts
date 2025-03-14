import { z } from "zod";

export const addTableSchema = z.object({
  name: z.string().min(3, "Enter a valid name"),
  capacity: z.string(),
});

export type TAddTableSchema = z.infer<typeof addTableSchema>;
