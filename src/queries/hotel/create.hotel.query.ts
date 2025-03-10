import endpoints from "@/lib/api.contant";
import { TCreateHotelSchema } from "@/schema/hotel/create.hotel.schema";
import { axiosAuthInstance } from "@/services/axios";
import { TError } from "@/types/error.type";
import { TCreateHotelResponse } from "@/types/hotel.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateHotel = () => {
  return useMutation<TCreateHotelResponse, TError, TCreateHotelSchema>({
    mutationFn: async (data: TCreateHotelSchema) => {
      toast.loading("Creating hotel ...");
      const response = await axiosAuthInstance.post(
        endpoints.hotel.createHotel,
        data
      );
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
