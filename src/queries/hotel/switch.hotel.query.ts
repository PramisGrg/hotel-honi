import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TError } from "@/types/error.type";
import { TSwitchHotelResponse } from "@/types/hotel.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useSwitchHotelQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<TSwitchHotelResponse, TError, string>({
    mutationFn: async (hotelId) => {
      const response = await axiosInstance.patch<TSwitchHotelResponse>(
        endpoints.hotel.switchHotel,
        {
          hotelId,
        }
      );
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success("Active hotel successfully switched");
      Cookies.set("token", data.data.token);
      queryClient.invalidateQueries({ queryKey: ["activeHotel"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
