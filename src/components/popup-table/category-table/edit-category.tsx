import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useEditCategoryQuery } from "@/queries/table/category-menu/edit.category.query";
import {
  addCategorySchema,
  TAddCategorySchema,
} from "@/schema/table/food-and-menu/add.category.schema";
import { useTableIdStore } from "@/store/table-id-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";

export interface DataTypeCategory {
  name: string;
}

export function EditCategory() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectCategoryId } = useTableIdStore((state) => ({
    selectCategoryId: state.selectCategoryId,
  }));

  const editCategory = useEditCategoryQuery();

  const form = useForm<TAddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
  });

  const onSubmit = (data: TAddCategorySchema) => {
    editCategory.mutate(
      { id: selectCategoryId, data },
      {
        onSettled: () => {
          setIsDialogOpen(false);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu Items</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Category</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Edit Category</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
