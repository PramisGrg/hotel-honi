import { DataTypeCategory } from "@/components/popup-table/category-table/edit-category";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditCategoryParams {
  id: string;
  data: DataTypeCategory;
}

export function UseEditCategoryQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditCategoryParams>({
    mutationFn: async ({ id, data }: EditCategoryParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      console.log("Mutation ID:", id);
      console.log("Mutation Data:", data);
      const response = await axiosAuthInstance.patch(
        `${endpoints.category.editCategory}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Category"] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the category"
      );
      console.log(error);
    },
  });
}
