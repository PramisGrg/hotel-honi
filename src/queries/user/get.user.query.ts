import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetUserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = () => {
  return useQuery<TGetUserResponse, Error>({
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetUserResponse>(
        endpoints.user.getUser
      );
      return response.data;
    },
  });
};
