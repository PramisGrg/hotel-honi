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
import { useForm, SubmitHandler } from "react-hook-form";
import { InventorySchema } from "@/schema/table/inventory-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryFormData } from "@/schema/table/inventory-schema";
import { MdOutlineEdit } from "react-icons/md";
import { useEditInventory } from "@/queries/table/inventory-table/edit-inventory-query";
import { useTableIdStore } from "@/store/table-id-store";
import { toast } from "sonner";

const EditInventory = () => {
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

  const { selectInventoryId } = useTableIdStore((state) => ({
    selectInventoryId: state.selectInventoryId,
  }));

  const editInventory = useEditInventory();

  const onSubmit: SubmitHandler<InventoryFormData> = (data) => {
    if (!selectInventoryId) {
      toast.error("No menu item selected for editing");
      return;
    }
    const formData = {
      ...data,
      image: selectedFiles[0],
    };

    editInventory.mutate(
      { id: selectInventoryId, formData },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          reset();
          setSelectedFiles([]);
        },
        onError: () => {
          reset();
        },
      }
    );
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
                <Label htmlFor="price">Quantity</Label>
                <Input id="price" {...register("quantity")} />
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
              disabled={editInventory.isPending}
            >
              {editInventory.isPending ? "Saving..." : "Edit Inventory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventory;
