import { DataType } from "@/components/popup/edit-items";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditDishesParams {
  id: string;
  data: DataType;
}

export function UseEditDishesQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditDishesParams>({
    mutationFn: async ({ id, data }: EditDishesParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      console.log("Mutation ID:", id);
      console.log("Mutation Data:", data);
      const response = await axiosAuthInstance.patch(
        `${endpoints.dishes.editDishes}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Dishes"] });
      console.log("edit bhayo hahaha");
      toast.success("Menu item updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the menu item"
      );
      console.log("edit bhayena hahaha");
      console.log(error);
    },
  });
}
