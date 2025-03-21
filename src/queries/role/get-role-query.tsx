import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetRoleResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  return useQuery<TGetRoleResponse, Error>({
    queryKey: ["getInvitation"],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetRoleResponse>(
        endpoints.role.getRole
      );
      return response.data;
    },
  });
};
