import endpoints from "@/lib/api.contant";
import { TAddCategorySchema } from "@/schema/table/food-and-menu/add.category.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditCategoryParams {
  id: string | undefined;
  data: TAddCategorySchema;
}

export function useEditCategoryQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditCategoryParams>({
    mutationFn: async ({ id, data }: EditCategoryParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.category.editCategory}/${id}`,
        data
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
