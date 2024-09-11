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
import { useEffect, useState } from "react";
import { MdOutlineFileUpload, MdOutlineDelete } from "react-icons/md";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { UseAddDishesQuery } from "@/queries/table/dishes-menu.tsx/add-dishes-query";
import { UseGetCategory } from "@/queries/table/category-menu/get-category-query";

const AddMenuItems = () => {
  const [rawFile, setRawFile] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRawFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (files: File[]) => {
      const imageData = URL.createObjectURL(files[0]);
      setRawFile(imageData);
    },
  });

  const createDishes = UseAddDishesQuery();
  const { data: categoryData } = UseGetCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price === undefined || !selectedCategory) return;

    const dishes = {
      name,
      price,
      description,
      category: selectedCategory,
    };
    createDishes.mutate(dishes, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
        setDescription("");
        setPrice(undefined);
        setSelectedCategory(undefined);
      },
    });
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data || []);
      console.log(categoryData.data);
    }
    console.log("category");
  }, [categoryData]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add Menu Items</DialogTitle>
          <DialogDescription>
            Please provide all details about the items to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 grid-cols-2 py-4">
            <div className="w-[400px] space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  value={price ?? ""}
                  id="price"
                  onChange={(e) => setPrice(Number(e.target.value))}
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
              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
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
                    alt="Uploaded file"
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItems;
