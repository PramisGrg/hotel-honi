import z from "zod";

export const addPaymentSchema = z.object({
  name: z.string().min(2, "Enter a payment method"),
  remarks: z.string().min(4, "Enter remarks for payment method"),
});

export type TAddPaymentSchema = z.infer<typeof addPaymentSchema>;
