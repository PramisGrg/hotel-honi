import { useTableIdStore } from "@/store/table-id-store";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetRoles } from "@/queries/role/get-role-query";
import { useUpdateStaff } from "@/queries/staff/update.staff.query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { TEditRole } from "@/types/table.types";

export function EditStaff() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectStaffId } = useTableIdStore((state) => ({
    selectStaffId: state.selectStaffId,
  }));

  const editStaff = useUpdateStaff();
  const { data: roles } = useGetRoles();

  const form = useForm<TEditRole>();

  const onSubmit = (data: TEditRole) => {
    const requiredValues = {
      staffId: selectStaffId,
      role: {
        type: data.roleName,
        id: data.roleId,
      },
    };
    editStaff.mutate(requiredValues, {
      onSettled: () => {
        setIsDialogOpen(false);
      },
    });
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
          <DialogTitle>Edit Staff Role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
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
                <Button disabled={editStaff.isPending} type="submit">
                  Invite Staff
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
