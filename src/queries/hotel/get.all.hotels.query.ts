import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TGetUserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllHotels = () => {
  return useQuery<TGetUserResponse, Error>({
    queryKey: ["getAllHotels"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get<TGetUserResponse>(
        // endpoints.user.getUser
        "/hotel"
      );
      return response.data;
    },
  });
};
