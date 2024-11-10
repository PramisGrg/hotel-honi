import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["getInvitation"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.role.getRole);
      return response.data;
    },
  });
};
