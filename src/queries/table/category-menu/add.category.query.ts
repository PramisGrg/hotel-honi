import endpoints from "@/lib/api.contant";
import { TAddCategorySchema } from "@/schema/table/food-and-menu/add.category.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddCategoryQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddCategorySchema>({
    mutationFn: async (category) => {
      const response = await axiosInstance.post(
        endpoints.category.addCategory,
        category
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
