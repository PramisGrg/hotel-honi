import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRoomsQuery = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery({
    queryKey: ["Rooms"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.rooms.getRooms, {
        params,
      });
      return response.data;
    },
  });
};
