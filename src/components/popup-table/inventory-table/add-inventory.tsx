import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import ReusableDropzone from "@/hooks/reusable-dropzone";
import { useAddInventoryQuery } from "@/queries/table/inventory-table/add-inventory-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { InventorySchema } from "@/schema/table/inventory-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryFormData } from "@/schema/table/inventory-schema";

const AddInventory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<InventoryFormData>({
    resolver: zodResolver(InventorySchema),
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const createInventory = useAddInventoryQuery();

  const onSubmit: SubmitHandler<InventoryFormData> = (data) => {
    const formData = {
      ...data,
      image: selectedFiles[0],
    };
    console.log(formData);
    createInventory.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        reset();
        setSelectedFiles([]);
      },
      onError: () => {
        reset();
        setSelectedFiles([]);
      },
    });
  };

  const handleFileSelected = (files: File[]) => {
    setSelectedFiles(files);
    if (files.length > 0) {
      setValue("image", files[0], { shouldValidate: true });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Inventory</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide inventory info to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 py-4">
            <div className="w-[350px] space-y-4">
              <div>
                <Label htmlFor="name">Inventory Name</Label>
                <Input id="name" {...register("name")} />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="" {...register("quantity")} />
              </div>
              {errors.quantity && (
                <p className="text-red-400 text-sm">
                  {errors.quantity.message}
                </p>
              )}
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} />
              </div>
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message}
                </p>
              )}
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" {...register("price")} />
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm">{errors.price.message}</p>
              )}
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" {...register("unit")} />
                {errors.unit && (
                  <p className="text-red-400 text-sm">{errors.unit.message}</p>
                )}
              </div>
            </div>
            <div>
              <ReusableDropzone
                onFileSelected={handleFileSelected}
                selectedFiles={selectedFiles}
              />
              {errors.image && (
                <p className="text-red-400 text-sm">
                  {errors.image.message as string}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-600 duration-500 hover:text-gray-300"
              type="submit"
              disabled={createInventory.isPending}
            >
              {createInventory.isPending ? "Saving..." : "Add Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventory;
