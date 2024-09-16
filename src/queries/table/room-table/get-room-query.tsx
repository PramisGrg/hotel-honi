import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetRoomQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const UseGetRoomQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: UseGetRoomQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery({
    queryKey: ["Rooms", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.rooms.getRooms, {
        params,
      });
      return response.data;
    },
  });
};
