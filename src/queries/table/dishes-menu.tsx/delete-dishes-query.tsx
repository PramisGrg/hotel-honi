import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UseDeletDishesQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuthInstance.delete(
        `${endpoints.dishes.deleteDishes}/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      console.log("delete bhayo hahaha");
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
      console.log("Delete bhayena hahaha");
    },
  });
}
