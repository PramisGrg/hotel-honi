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
import { useAddRoomQuery } from "@/queries/table/room-table/add.room.query";
import {
  addRoomSchema,
  TAddRoomSchema,
} from "@/schema/table/room-and-space/add.room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddRoom = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createRoom = useAddRoomQuery();

  const form = useForm<TAddRoomSchema>({
    resolver: zodResolver(addRoomSchema),
  });

  const onSubmit = (values: TAddRoomSchema) => {
    console.log(values, "This is answer");
    createRoom.mutate(values, {
      onSettled: () => {
        setIsDialogOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>Add Room</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Room</FormLabel>
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Price</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter the price of room"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Capacity</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter the capacity of room"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Add Room</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoom;
