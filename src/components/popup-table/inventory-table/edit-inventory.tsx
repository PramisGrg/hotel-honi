import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditInventory } from "@/queries/table/inventory-table/edit-inventory-query";
import { useTableIdStore } from "@/store/table-id-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";

export interface InventoryType {
  name: string;
  quantity: number;
  description: string;
  image: File;
  unit: string;
}

export function EditInventory() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { selectInventoryId } = useTableIdStore((state) => ({
    selectInventoryId: state.selectInventoryId,
  }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles);
    },
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    multiple: false,
  });

  const editInventory = useEditInventory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectInventoryId) {
      toast.error("No menu item selected for editing");
      return;
    }
    const data: InventoryType = {
      name,
      quantity,
      description,
      unit,
      image: selectedFiles[0],
    };

    editInventory.mutate(
      { id: selectInventoryId, data },
      {
        onSuccess: () => {
          console.log("Edit successful");
          setIsDialogOpen(false);
        },
        onError: () => {
          setName("");
          setDescription("");
          setQuantity(0);
          setUnit("");
          setSelectedFiles([]);
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
      <DialogContent className="max-w-[850px]">
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your inventory here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 grid-cols-2 py-4">
            <div className="w-[350px] space-y-4">
              <div>
                <Label htmlFor="name">Inventory Name</Label>
                <Input
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Unit</Label>
                <Input
                  value={unit}
                  id="name"
                  onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Quantity</Label>
                <Input
                  value={quantity}
                  id="price"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div
                {...getRootProps()}
                className={`dropzone border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer text-center ${
                  isDragActive ? "bg-gray-100" : ""
                } relative h-64`}
              >
                <input {...getInputProps()} />
                {selectedFiles.length === 0 ? (
                  <div className="text-gray-500 ">
                    Drag & drop an image here, or click to select an image
                    <div className="flex items-center justify-center p-4 text-green-400"></div>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-600 duration-500 hover:text-gray-300"
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
