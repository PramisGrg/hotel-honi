import z from "zod";

export const addCustomerSchema = z.object({
  name: z.string().min(2, "Enter a valid name"),
  address: z.string().min(3, "Enter a valid address"),
  contactNumber: z.string().min(3, "Enter a valid contact number"),
  emailAddress: z.string().email("Enter a valid email"),
  openingBalance: z.coerce.number().optional(),
});

export type TAddCustomerSchema = z.infer<typeof addCustomerSchema>;
