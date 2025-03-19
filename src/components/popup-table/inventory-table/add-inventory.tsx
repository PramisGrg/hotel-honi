import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAddInventoryQuery } from "@/queries/table/inventory-table/add.inventory.query";
import { useForm } from "react-hook-form";
import {
  addInventorySchema,
  TAddInventorySchema,
} from "@/schema/table/inventory.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDropzone } from "react-dropzone";

const AddInventory = () => {
  const form = useForm<TAddInventorySchema>({
    resolver: zodResolver(addInventorySchema),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createInventory = useAddInventoryQuery();

  const onSubmit = (values: TAddInventorySchema) => {
    console.log(values);
    createInventory.mutate(values, {
      onSettled: () => {
        setIsDialogOpen(false);
      },
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setValue("image", acceptedFiles, { shouldValidate: true });
    },
    [form]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Add Inventory</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Inventory</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Inventory</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary/30 focus:border-none"
                          placeholder="Enter your inventory name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Price</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary/30 focus:border-none"
                          placeholder="Enter your inventory price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary/30 focus:border-none"
                          placeholder="Enter short inventory description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Quantity</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary/30 focus:border-none"
                          placeholder="Enter inventory quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Unit</FormLabel>
                      <FormControl>
                        <Input
                          className="border-primary/30 focus:border-none"
                          placeholder="Enter inventory unit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-semibold">Image</FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-500">
                            Drag & drop an image here, or click to select
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {acceptedFiles.length > 0 && (
                        <div className="mt-2">
                          {acceptedFiles.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center gap-2"
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded"
                              />
                              <span className="text-sm">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="pt-4">
              <Button disabled={createInventory.isPending} type="submit">
                Add Inventory
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventory;
