import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface InventoryType {
  name: string;
  description: string;
  quantity: string;
  image: File;
}

export function useAddInventoryQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (inventory: InventoryType) => {
      const response = await axiosAuthInstance.post(
        endpoints.inventory.addInventory,
        inventory
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Inventory"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
