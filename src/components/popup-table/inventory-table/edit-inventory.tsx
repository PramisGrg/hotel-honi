import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useEditInventory } from "@/queries/table/inventory-table/edit.inventory.query";
import {
  addInventorySchema,
  TAddInventorySchema,
} from "@/schema/table/inventory.schema";
import { useTableIdStore } from "@/store/table-id-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";

const EditInventory = () => {
  const form = useForm<TAddInventorySchema>({
    resolver: zodResolver(addInventorySchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      quantity: "",
      unit: "",
      image: [],
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectInventoryId } = useTableIdStore((state) => ({
    selectInventoryId: state.selectInventoryId,
  }));

  const editInventory = useEditInventory();

  const onSubmit = (data: TAddInventorySchema) => {
    if (!selectInventoryId) {
      toast.error("No menu item selected for editing");
      return;
    }

    editInventory.mutate({ id: selectInventoryId, data });
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
        <button onClick={() => setIsDialogOpen(true)}>
          <MdOutlineEdit className="text-green-700 w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your inventory here
          </DialogDescription>
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
              <Button disabled={editInventory.isPending} type="submit">
                Add Inventory
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventory;
