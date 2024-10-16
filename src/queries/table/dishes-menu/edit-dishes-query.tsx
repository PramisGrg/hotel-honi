import { DataTypeMenu } from "@/components/popup-table/dishes-table/edit-menu";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditDishesParams {
  id: string;
  data: DataTypeMenu;
}

export function UseEditDishesQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditDishesParams>({
    mutationFn: async ({ id, data }: EditDishesParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(
        `${endpoints.dishes.editDishes}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      toast.success("Menu item updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the menu item"
      );
    },
  });
}
