import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Dish = {
  name: string;
  price: number;
  description: string;
};

export function UseAddDishesQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dish: Dish) => {
      const response = await axiosAuthInstance.post(
        endpoints.dishes.addDishes,
        dish
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data.message, "🧐🧐🧐");
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
