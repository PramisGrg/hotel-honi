import { z } from "zod";

export const addRoomSchema = z.object({
  name: z.string().min(3, "Enter a valid name"),
  price: z.string(),
  capacity: z.string(),
});

export type TAddRoomSchema = z.infer<typeof addRoomSchema>;
