import endpoints from "@/lib/api.contant";
import { TAddSpaceSchema } from "@/schema/table/room-and-space/add.space.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddSpaceQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddSpaceSchema>({
    mutationFn: async (name) => {
      const response = await axiosInstance.post(
        endpoints.spaces.addSpace,
        name
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Spaces"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
