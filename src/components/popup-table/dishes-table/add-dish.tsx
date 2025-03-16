import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { UseAddDishesQuery } from "@/queries/table/dishes-menu/add.dishes.query";
import { UseGetCategory } from "@/queries/table/category-menu/get.category.query";
import { useForm, SubmitHandler } from "react-hook-form";
import { DishesType } from "@/schema/table/dish-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ReusableDropzone from "@/hooks/reusable-dropzone";
import {
  addDishSchema,
  TAddDishSchema,
} from "@/schema/table/food-and-menu/add.dish.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TGetCategoryResponseData } from "@/types/table.types";

const AddDish = () => {
  const form = useForm<TAddDishSchema>({
    resolver: zodResolver(addDishSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<TGetCategoryResponseData[]>([]);
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
        <Button onClick={() => setIsDialogOpen(true)}>Add Menu Items</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add Menu Items</DialogTitle>
        </DialogHeader>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Dish</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your dish name"
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
                        placeholder="Enter your dish price"
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
                        placeholder="Enter your dish price"
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
                    <FormLabel className="font-semibold">Description</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter short dish description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Add Dishes</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDish;
