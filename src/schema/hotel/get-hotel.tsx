import { z } from "zod";

export const GetHotelSchema = z.object({
  name: z.string().min(2, "Enter a valid hotel name"),
  address: z.string().min(2, "Enter a valid hotel address"),
  primaryContact: z.string().min(2, "Enter a valid phone Number"),
});

export type GetHotelSchemaType = z.infer<typeof GetHotelSchema>;
