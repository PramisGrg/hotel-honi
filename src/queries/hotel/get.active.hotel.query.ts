import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TActivateHotelResponse } from "@/types/hotel.types";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveHotel = () => {
  return useQuery<TActivateHotelResponse>({
    queryKey: ["activeHotel"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.hotel.getActiveHotel);
      return response.data;
    },
  });
};
