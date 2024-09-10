import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function UseAddDishesQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dish) => {
      const response = await axiosAuthInstance.post(
        endpoints.dishes.addDishes,
        dish
      );
      return response;
    },
    onSuccess: () => {
      console.log("😀😀");
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      console.log("hahah");
    },
  });
}
