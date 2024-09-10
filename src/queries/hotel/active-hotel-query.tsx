import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface ActiveHotel {
  id: string;
  name: string;
  address: string;
}

interface ActiveHotelType {
  data: ActiveHotel;
}

export const useGetActiveHotel = () => {
  return useQuery<ActiveHotelType>({
    queryKey: ["activeHotel"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.hotel.getActiveHotel
      );
      return response.data as ActiveHotelType;
    },
  });
};
