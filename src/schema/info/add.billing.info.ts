import { z } from "zod";

export const addBillDataSchema = z.object({
  taxRate: z.number().or(z.string().transform((val) => Number(val))),
  serviceChargeType: z.string(),
  serviceCharge: z.number().or(z.string().transform((val) => Number(val))),
});

export type TAddBillDataSchema = z.infer<typeof addBillDataSchema>;
