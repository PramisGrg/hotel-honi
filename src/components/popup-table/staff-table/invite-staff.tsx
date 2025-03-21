import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetRoles } from "@/queries/role/get-role-query";
import { useInviteStaff } from "@/queries/staff/invite.staff.query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectValue,
  Select,
  SelectTrigger,
} from "@/components/ui/select";
import {
  inviteStaffSchema,
  TInviteStaffSchema,
} from "@/schema/table/invite.staff.schema";
import { PhoneInput } from "@/components/phone-input";

const InviteStaff = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TInviteStaffSchema>({
    resolver: zodResolver(inviteStaffSchema),
  });

  const { data: roles } = useGetRoles();

  const inviteStaff = useInviteStaff();

  const onSubmit = (data: TInviteStaffSchema) => {
    const dialCode = data.phoneNumber.slice(1, 4);
    const phoneNumber = data.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      role: {
        type: data.roleName,
        id: data.roleId,
      },
    };
    inviteStaff.mutate(requiredValues, {
      onSettled: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Invite Staff</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Invite Staff</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="98XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleId"
                render={() => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={(selectedId) => {
                        const selectedRole = roles?.data.find(
                          (role) => role.id === selectedId
                        );
                        form.setValue("roleId", selectedId);
                        form.setValue("roleName", selectedRole?.name || "");
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles?.data.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button disabled={inviteStaff.isPending} type="submit">
                  Invite Staff
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteStaff;
