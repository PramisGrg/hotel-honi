import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ["getInvitation"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.invitations.getInvitations
      );
      return response.data;
    },
  });
};
