import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useAddSpaceQuery } from "@/queries/table/space-table/add.space.query";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  addSpaceSchema,
  TAddSpaceSchema,
} from "@/schema/table/room-and-space/add.space.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddSpace = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createSpace = useAddSpaceQuery();

  const form = useForm<TAddSpaceSchema>({
    resolver: zodResolver(addSpaceSchema),
  });

  const onSubmit = (name: TAddSpaceSchema) => {
    createSpace.mutate(name, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Add Space</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Space</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide Space name to add
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
};

export default AddSpace;
