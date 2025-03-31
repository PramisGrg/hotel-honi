import endpoints from "@/lib/api.contant";
import { TCreateHotelSchema } from "@/schema/hotel/create.hotel.schema";
import axiosInstance from "@/services/axios";
import { TError } from "@/types/error.type";
import { TCreateHotelResponse } from "@/types/hotel.types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateHotel = () => {
  const navigate = useNavigate();
  return useMutation<TCreateHotelResponse, TError, TCreateHotelSchema>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        endpoints.hotel.createHotel,
        data
      );
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard/home");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
