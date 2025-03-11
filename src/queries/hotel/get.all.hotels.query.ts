import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetAllHotelResponse } from "@/types/hotel.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllHotels = () => {
  return useQuery<TGetAllHotelResponse, Error>({
    queryKey: ["getAllHotels"],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetAllHotelResponse>(
        endpoints.hotel.allHotel
      );
      return response.data;
    },
  });
};
