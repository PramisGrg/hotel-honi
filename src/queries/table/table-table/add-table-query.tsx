import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Tables = {
  name: string;
  capacity: number;
};

export function UseAddTableQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (space: Tables) => {
      const response = await axiosAuthInstance.post(
        endpoints.tables.addTable,
        space
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Tables"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
