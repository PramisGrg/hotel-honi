import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditSupplierQuery } from "@/queries/table/supplier-table/edit.supplier.query";
import {
  addSupplierSchema,
  TAddSupplierSchema,
} from "@/schema/table/customer-and-supplier/add.supplier.schema";
import { useTableIdStore } from "@/store/table-id-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";

export function EditSupplier() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TAddSupplierSchema>({
    resolver: zodResolver(addSupplierSchema),
  });
  const { selectSupplierId } = useTableIdStore((state) => ({
    selectSupplierId: state.selectSupplierId,
  }));

  const editSupplier = useEditSupplierQuery();

  const onSubmit = (data: TAddSupplierSchema) => {
    if (!selectSupplierId) return;
    editSupplier.mutate(
      { id: selectSupplierId, data },
      {
        onSettled: () => {
          setIsDialogOpen(false);
        },
      }
    );
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
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Supplier</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your supplier name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Address</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter the your supplier address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your supplier email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your supplier contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button disabled={editSupplier.isPending} type="submit">
                  Edit Supplier
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
