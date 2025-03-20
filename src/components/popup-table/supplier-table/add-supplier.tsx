import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAddSupplierQuery } from "@/queries/table/supplier-table/add.supplier.query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  addSupplierSchema,
  TAddSupplierSchema,
} from "@/schema/table/customer-and-supplier/add.supplier.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddSupplier = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TAddSupplierSchema>({
    resolver: zodResolver(addSupplierSchema),
  });

  const createSupplier = useAddSupplierQuery();

  const onSubmit = (value: TAddSupplierSchema) => {
    createSupplier.mutate(value, {
      onSettled: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Add Supplier</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Supplier</DialogTitle>
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
                <Button disabled={createSupplier.isPending} type="submit">
                  Add Supplier
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplier;
