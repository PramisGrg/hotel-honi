import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/phone-input";
import { useGetRoles } from "@/queries/role/get-role-query";
import { useInviteStaff } from "@/queries/staff/invite-staff-query";

export interface Role {
  id: string;
  name: string;
  customName: string | null;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

const InviteStaffSchema = z.object({
  phoneNumber: z.string().min(8, { message: "Enter a valid phone number" }),
});

type InviteStaffType = z.infer<typeof InviteStaffSchema>;

const InviteStaff = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteStaffType>({
    resolver: zodResolver(InviteStaffSchema),
  });

  const { data: rolesData } = useGetRoles();

  const roles = (rolesData?.data ?? []) as Role[];

  const inviteStaff = useInviteStaff();

  const onSubmit = (data: InviteStaffType) => {
    const dialCode = data.phoneNumber.slice(1, 4);
    const phoneNumber = data.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      role: {
        type: role,
        id: roleId,
      },
    };

    inviteStaff.mutate(requiredValues, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Invite Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Invite Staff</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please invite staff to add to your hotel
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    placeholder="98XXXXXXXX"
                    className=""
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="type">Type</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {role
                      ? roles.find((roles) => roles.name === role)?.name
                      : "Select Role..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((roles) => (
                          <CommandItem
                            key={roles.id}
                            value={roles.name}
                            onSelect={(currentValue) => {
                              setRole(
                                currentValue === role ? "" : currentValue
                              );
                              setRoleId(currentValue === role ? "" : roles.id);
                              setOpen(false);
                            }}
                          >
                            {roles.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                role === roles.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-600 duration-500 hover:text-gray-300"
                type="submit"
              >
                Invite Staff
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteStaff;
