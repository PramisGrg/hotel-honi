import { z } from "zod";

export const addBillDataSchema = z.object({
  taxRate: z.string(),
  serviceChargeType: z.string(),
  serviceCharge: z.string(),
});

export type TAddBillDataSchema = z.infer<typeof addBillDataSchema>;
