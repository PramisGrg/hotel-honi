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
import { Label } from "@/components/ui/label";
import { useTableIdStore } from "@/store/table-id-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetRoles } from "@/queries/role/get-role-query";
import { Role } from "./invite-staff";
import { useUpdateStaff } from "@/queries/staff/update-staff-query";

export interface DataTypeStaff {
  staffId: string;
  type: string;
}

export function EditStaff() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectStaffId } = useTableIdStore((state) => ({
    selectStaffId: state.selectStaffId,
  }));

  const editStaff = useUpdateStaff();

  const { data: rolesData } = useGetRoles();

  const roles = (rolesData?.data ?? []) as Role[];

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectStaffId) {
      toast.error("No menu item selected for editing");
      return;
    }

    const requiredValues = {
      staffId: selectStaffId,
      role: {
        type: role,
        id: roleId,
      },
    };

    editStaff.mutate(requiredValues, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setRole("");
      },
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setIsDialogOpen(true)}>
          <MdOutlineEdit className="text-green-700 w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your Space here 🤪
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 py-4">
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
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:text-gray-200 duration-300 hover:shadow-md"
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
