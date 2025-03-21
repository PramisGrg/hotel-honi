import { z } from "zod";

export const inviteStaffSchema = z.object({
  phoneNumber: z.string().min(8, { message: "Enter a valid phone number" }),
  roleId: z.string(),
  roleName: z.string(),
});

export type TInviteStaffSchema = z.infer<typeof inviteStaffSchema>;
