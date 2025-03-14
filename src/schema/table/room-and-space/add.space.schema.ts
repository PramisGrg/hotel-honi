import { z } from "zod";

export const addSpaceSchema = z.object({
  name: z.string(),
});

export type TAddSpaceSchema = z.infer<typeof addSpaceSchema>;
