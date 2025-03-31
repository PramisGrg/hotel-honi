import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
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
  return useMutation<TLoginResponse, TError, KotUpdateData>({
    mutationFn: async ({ orderId, kotId, kotItemId, ...kotUpdateData }) => {
      const response = await axiosInstance.patch(
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
      toast.error(error.response.data.message);
    },
  });
}
