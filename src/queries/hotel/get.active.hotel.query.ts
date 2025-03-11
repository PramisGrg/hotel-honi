import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export interface ActiveHotel {
  id: string;
  name: string;
  address: string;
  primaryContact: string;
}

export interface ActiveHotelType {
  data: ActiveHotel;
}

export const useGetActiveHotel = () => {
  return useQuery<ActiveHotelType>({
    queryKey: ["activeHotel"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.hotel.getActiveHotel);
      return response.data as ActiveHotelType;
    },
  });
};
