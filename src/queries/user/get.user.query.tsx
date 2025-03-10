import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TGetUserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = () => {
  return useQuery<TGetUserResponse, Error>({
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get<TGetUserResponse>(
        endpoints.user.getUser
      );
      return response.data;
    },
  });
};
