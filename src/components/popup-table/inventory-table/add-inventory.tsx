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
import { Upload } from "lucide-react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useDropzone } from "react-dropzone";
import { useAddInventoryQuery } from "@/queries/table/inventory-table/add-inventory-query";

const AddInventory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const createInventory = useAddInventoryQuery();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles);
    },
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      quantity,
      description,
      image: selectedFiles[0],
      unit: "kg",
    };

    console.log("Hi from Pramis", formData);

    createInventory.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
      },
    });
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
                    <div className="flex items-center justify-center p-4 text-green-400">
                      <Upload />
                    </div>
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
};

export default AddInventory;
