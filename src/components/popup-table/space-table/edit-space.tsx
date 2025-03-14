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
import { useEditSpaceQuery } from "@/queries/table/space-table/edit.space.query";
import {
  addSpaceSchema,
  TAddSpaceSchema,
} from "@/schema/table/room-and-space/add.space.schema";
import { useTableIdStore } from "@/store/table-id-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";

export function EditSpace() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectSpaceId } = useTableIdStore((state) => ({
    selectSpaceId: state.selectSpaceId,
  }));

  const editSpace = useEditSpaceQuery();

  const form = useForm<TAddSpaceSchema>({
    resolver: zodResolver(addSpaceSchema),
  });

  const onSubmit = (name: TAddSpaceSchema) => {
    editSpace.mutate(
      { id: selectSpaceId, name },
      {
        onSettled: () => {
          form.reset();
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
          <DialogTitle>Edit Space</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your Space here 🤪
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Space</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your room"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Add Space</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
