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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseGetCategory } from "@/queries/table/category-menu/get.category.query";
import { useAddDishQuery } from "@/queries/table/dishes-menu/add.dishes.query";
import {
  addDishSchema,
  TAddDishSchema,
} from "@/schema/table/food-and-menu/add.dish.schema";
import { TGetCategoryResponseData } from "@/types/table.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

const AddDish = () => {
  const form = useForm<TAddDishSchema>({
    resolver: zodResolver(addDishSchema),
  });

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<TGetCategoryResponseData[]>([]);

  const createDish = useAddDishQuery();
  const { data: categoryData } = UseGetCategory();

  const onSubmit = (value: TAddDishSchema) => {
    createDish.mutate(value, {
      onSettled: () => {
        setIsDialogOpen(false);
        form.reset();
        form.setValue("image", [], { shouldValidate: false });
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-10">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Description
                      </FormLabel>
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
                            <SelectValue
                              className="border-primary/30 focus:border-none"
                              placeholder="Category"
                            />
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
              <div className="pt-4">
                <Button disabled={createDish.isPending} type="submit">
                  Add Dishes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDish;
