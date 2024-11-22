import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateHotel = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      address: string;
      primaryContact: string;
    }) => {
      const response = await axiosAuthInstance.patch(
        endpoints.hotel.updateHotel,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: () => {
      toast.error("Failed to update hotel Info");
    },
  });
};
