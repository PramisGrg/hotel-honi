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
import { useEffect, useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { UseAddDishesQuery } from "@/queries/table/dishes-menu/add-dishes-query";
import { UseGetCategory } from "@/queries/table/category-menu/get-category-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { DishesSchema, DishesType } from "@/schema/table/dish-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableDropzone from "@/hooks/reusable-dropzone";

interface Category {
  id: string;
  name: string;
}

const AddMenuItems = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DishesType>({
    resolver: zodResolver(DishesSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const createDishes = UseAddDishesQuery();
  const { data: categoryData } = UseGetCategory();

  const handleFileSelected = (files: File[]) => {
    setSelectedFiles(files);
    if (files.length > 0) {
      setValue("image", files[0], { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<DishesType> = (data) => {
    const formData = {
      ...data,
      image: selectedFiles[0],
      category: selectedCategory,
    };

    createDishes.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        reset();
        setSelectedFiles([]);
        setCategories([]);
      },
      onError: () => {
        reset();
      },
    });
  };

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data || []);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-2 py-4">
            <div className="w-[400px] space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm">
                  {errors.name.message as string}
                </p>
              )}
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" {...register("price")} />
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm">
                  {errors.price.message as string}
                </p>
              )}
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...register("description")} />
              </div>
              {errors.description && (
                <p className="text-red-400 text-sm">
                  {errors.description.message as string}
                </p>
              )}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setValue("category", value, { shouldValidate: true });
                  }}
                >
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
                {errors.category && (
                  <p className="text-red-400 text-sm">
                    {errors.category.message}
                  </p>
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
