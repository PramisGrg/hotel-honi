import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(3, "Enter a valid hotel name"),
  address: z.string().min(3, "Enter a valid address"),
  primaryContact: z.string().min(3, "Enter a valid phone number"),
});

export type TCreateHotelSchema = z.infer<typeof createHotelSchema>;
