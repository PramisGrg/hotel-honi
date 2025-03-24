import z from "zod";

export const editUserSchema = z.object({
  name: z.string().min(2, "Enter user name"),
  phoneNumber: z.string().min(2, "Enter user phone Number"),
  username: z.string().min(2, "Enter username"),
  image: z.any().optional(),
});

export type TEditUserSchema = z.infer<typeof editUserSchema>;
