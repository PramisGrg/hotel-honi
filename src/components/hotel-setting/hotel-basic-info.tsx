import { useGetActiveHotel } from "@/queries/hotel/get.active.hotel.query";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useUpdateHotel } from "@/queries/hotel/update.hotel.query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import AppLayout from "@/layout/dashboard-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addGeneralInfoSchema,
  TAddGeneralInfoSchema,
} from "@/schema/info/add.general.info";

const HotelBasicInfo = () => {
  const { data: hotelInfo } = useGetActiveHotel();
  const hotelInfoData = hotelInfo?.data;

  const form = useForm<TAddGeneralInfoSchema>({
    resolver: zodResolver(addGeneralInfoSchema),
    defaultValues: {
      name: "",
      address: "",
      primaryContact: "",
    },
  });

  const updateHotel = useUpdateHotel();

  useEffect(() => {
    if (hotelInfoData) {
      form.reset({
        name: hotelInfoData.name || "",
        address: hotelInfoData.address || "",
        primaryContact: hotelInfoData.primaryContact || "",
      });
    }
  }, [hotelInfoData, form]);

  const onSubmit = async (data: TAddGeneralInfoSchema) => {
    updateHotel.mutate(data);
  };

  return (
    <AppLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 border p-6 rounded-lg"
        >
          <h1 className="text-neutral-600 text-xl">General Info</h1>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Hotel Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Change your hotel name"
                        {...field}
                      />
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
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Change your hotel address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="primaryContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Primary Contact
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Change your primary contact"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button disabled={!form.formState.isDirty} type="submit">
                  Update Info
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </AppLayout>
  );
};

export default HotelBasicInfo;
