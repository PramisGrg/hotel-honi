import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { queryClient } from "@/main";

export const useSwitchHotelMutation = () => {
  return useMutation({
    mutationFn: async (hotelId: string) => {
      const response = await axiosAuthInstance.patch(
        endpoints.hotel.switchHotel,
        { hotelId }
      );
      console.log(response, "😀😀");
      return response?.data;
    },

    onSuccess: (data) => {
      queryClient.clear();
      Cookies.set("token", data.data.token);
      toast.success("Hotel Switched");
      window.location.reload();
    },

    onError: (error) => {
      console.log("Error", error);
      toast.error("Hotel didn't switch");
    },
  });
};
