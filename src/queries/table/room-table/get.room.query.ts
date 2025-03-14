import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetRoomResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

interface RoomQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const useGetRoomQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: RoomQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery<TGetRoomResponse, Error>({
    queryKey: ["Rooms", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetRoomResponse>(
        endpoints.rooms.getRooms,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
