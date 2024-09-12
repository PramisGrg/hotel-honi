import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Spaces = {
  name: string;
};

export function UseAddSpaceQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (space: Spaces) => {
      const response = await axiosAuthInstance.post(
        endpoints.spaces.addSpace,
        space
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Spaces"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
