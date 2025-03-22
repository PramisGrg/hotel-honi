import { z } from "zod";

export const addGeneralInfoSchema = z.object({
  name: z.string().min(2, "Enter a valid name"),
  address: z.string().min(2, "Enter a valid address"),
  primaryContact: z.string().min(2, "Enter a valid phone number"),
});

export type TAddGeneralInfoSchema = z.infer<typeof addGeneralInfoSchema>;
