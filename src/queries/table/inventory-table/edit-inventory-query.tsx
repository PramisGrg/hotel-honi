import { InventoryType } from "./add-inventory-query";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditInventoryParams {
  id: string;
  formData: InventoryType;
}

export function useEditInventory() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditInventoryParams>({
    mutationFn: async ({ id, formData }: EditInventoryParams) => {
      if (!id) {
        throw new Error("No inventory item ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(
        `${endpoints.inventory.editInventory}/${id}`,
        formData
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
    },
  });
}
