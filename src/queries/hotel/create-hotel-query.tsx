import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateHotel = () => {
  return useMutation({
    mutationFn: async (data: { name: string; address: string }) => {
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
      console.log("Error", error);
      toast.error("Failed to create Hotel");
    },
  });
};
