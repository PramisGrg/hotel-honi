import z from "zod";

export const addSupplierSchema = z.object({
  name: z.string().min(2, "Enter a valid supplier name"),
  address: z.string().min(2, "Enter a valid address"),
  contactNumber: z.string().min(2, "Enter a valid Contact number"),
  emailAddress: z.string().email("Enter a valid email"),
});

export type TAddSupplierSchema = z.infer<typeof addSupplierSchema>;
