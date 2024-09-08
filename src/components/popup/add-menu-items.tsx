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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

interface AddNewItemsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMenuItems: React.FC<AddNewItemsProps> = ({ isOpen, onClose }) => {
  const [rawFile, setRawFile] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRawFile("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (files: File[]) => {
      const imageData = URL.createObjectURL(files[0]);
      setRawFile(imageData);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add Menu Items</DialogTitle>
          <p className="text-gray-500">
            Please provide all details about the items to add
          </p>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-2 py-4">
          <div className="w-[400px] space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Cafe">Cafe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-6 text-center overflow-hidden relative cursor-pointer"
          >
            <input {...getInputProps()} />
            {rawFile ? (
              <div>
                <img
                  className="w-full h-full object-cover inset-0 absolute"
                  src={rawFile}
                />
                <button
                  onClick={handleDelete}
                  className="absolute text-2xl text-red-500 top-2 right-2"
                >
                  <MdOutlineDelete />
                </button>
              </div>
            ) : (
              <div className="flex items-center h-full justify-center flex-col">
                <MdOutlineFileUpload className="text-blue-500 w-10 h-10 " />
                <p>Drag 'n' drop an image here,</p>
                <p>or click to select one</p>
              </div>
            )}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItems;
