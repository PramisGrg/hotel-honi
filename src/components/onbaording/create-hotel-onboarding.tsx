import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateHotel } from "@/queries/hotel/create.hotel.query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createHotelSchema,
  TCreateHotelSchema,
} from "@/schema/hotel/create.hotel.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface TOnboardingSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function CreateHotelOnboarding({
  isOpen,
  setIsOpen,
}: TOnboardingSidebarProps) {
  const form = useForm<TCreateHotelSchema>({
    resolver: zodResolver(createHotelSchema),
  });

  const createHotel = useCreateHotel();

  // try {
  //   await createHotelMutation.mutateAsync(data);
  //   setHotelName("");
  //   setAddress("");
  //   setIsOpen(false);
  //   navigate("/dashboard/home");
  // } catch (error) {
  //   console.error("Error creating hotel:", error);
  // }

  const onSubmit = (values: TCreateHotelSchema) => {
    console.log(values);
    createHotel.mutate(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[550px] space-y-2">
        <DialogHeader>
          <DialogTitle>Create Hotel</DialogTitle>
          <DialogDescription>
            Please provide some information to create new hotel
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Hotel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Pramis Hotel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Hotel Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Pokhara" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primaryContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Primary Contact
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="98*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button className="w-full" type="submit">
                Create Hotel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
