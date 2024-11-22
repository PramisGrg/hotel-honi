import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type KotUpdateData = {
  orderId?: string;
  kotId?: string;
  kotItemId?: string;
  status: string;
  quantity?: number;
};

export function useUpdateKot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      kotId,
      kotItemId,
      ...kotUpdateData
    }: KotUpdateData) => {
      const response = await axiosAuthInstance.patch(
        `/order/${orderId}/kot/${kotId}/${kotItemId}`,
        kotUpdateData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Kot"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Please satisfy the given conditions");
    },
  });
}
