import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Category = {
  name: string;
};

export function UseAddCategoryQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Category) => {
      const response = await axiosAuthInstance.post(
        endpoints.category.addCategory,
        category
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
