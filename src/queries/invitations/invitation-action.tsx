import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type InventoryAction = {
  invitationId: string;
  status: string;
};

export function useInvitationAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (customer: InventoryAction) => {
      const response = await axiosAuthInstance.patch(
        endpoints.invitations.invitationAction,
        customer
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getInvitations"] });
      toast.success(data.message);
    },
  });
}
