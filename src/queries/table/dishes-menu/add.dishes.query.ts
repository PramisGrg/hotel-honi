import endpoints from "@/lib/api.contant";
import { TAddDishSchema } from "@/schema/table/food-and-menu/add.dish.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddDishQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddDishSchema>({
    mutationFn: async (dish) => {
      const response = await axiosInstance.postForm(
        endpoints.dishes.addDishes,
        dish,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
