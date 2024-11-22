import { useGetActiveHotel } from "@/queries/hotel/active-hotel-query";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { GetHotelSchema, GetHotelSchemaType } from "@/schema/hotel/get-hotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateHotel } from "@/queries/hotel/update-hotel";

const HotelBasicInfo = () => {
  const { data: hotelInfo } = useGetActiveHotel();
  const hotelInfoData = hotelInfo?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<GetHotelSchemaType>({
    resolver: zodResolver(GetHotelSchema),
    defaultValues: {
      name: "",
      address: "",
      primaryContact: "",
    },
  });

  const updateHotel = useUpdateHotel();

  useEffect(() => {
    if (hotelInfoData) {
      reset({
        name: hotelInfoData.name || "",
        address: hotelInfoData.address || "",
        primaryContact: hotelInfoData.primaryContact || "",
      });
    }
  }, [hotelInfoData, reset]);

  const onSubmit = async (data: GetHotelSchemaType) => {
    console.log(data, "This is form data");
    updateHotel.mutate(data);
  };

  return (
    <div className="p-6 space-y-4 border w-4/6 rounded-md">
      <div>
        <h1 className="text-xl font-semibold">Basic Information</h1>
        <p className="text-gray-400">Update basic information of hotel</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label>Hotel name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input {...register("address")} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Primary Contact</Label>
            <Input {...register("primaryContact")} />
            {errors.primaryContact && (
              <p className="text-sm text-red-500">
                {errors.primaryContact.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={!isDirty}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelBasicInfo;
