import { InventoryType } from "@/components/popup-table/inventory-table/edit-inventory";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditInventoryParams {
  id: string;
  data: InventoryType;
}

export function useEditInventory() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditInventoryParams>({
    mutationFn: async ({ id, data }: EditInventoryParams) => {
      if (!id) {
        throw new Error("No inventory item ID provided for editing");
      }
      console.log("Mutation Data:", data);
      const response = await axiosAuthInstance.patch(
        `${endpoints.inventory.editInventory}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Inventory"] });
      toast.success("Inventory updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the inventory"
      );
      console.log(error);
    },
  });
}
