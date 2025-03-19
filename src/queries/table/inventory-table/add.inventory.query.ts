import endpoints from "@/lib/api.contant";
import { TAddInventorySchema } from "@/schema/table/inventory.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddInventoryQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddInventorySchema>({
    mutationFn: async (inventory) => {
      const response = await axiosInstance.postForm(
        endpoints.inventory.addInventory,
        inventory
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Inventory"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
