import endpoints from "@/lib/api.contant";
import { TAddInventorySchema } from "@/schema/table/inventory.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditInventoryParams {
  id: string;
  data: TAddInventorySchema;
}

export function useEditInventory() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditInventoryParams>({
    mutationFn: async ({ id, data }: EditInventoryParams) => {
      if (!id) {
        throw new Error("No inventory item ID provided for editing");
      }
      const response = await axiosInstance.patch(
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
      toast.error(error.response.data.message);
    },
  });
}
