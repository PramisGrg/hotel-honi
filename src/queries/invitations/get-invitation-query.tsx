import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ["getInvitation"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        endpoints.invitations.getInvitations
      );
      return response.data;
    },
  });
};
