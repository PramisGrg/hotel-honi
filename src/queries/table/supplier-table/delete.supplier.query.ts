import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteSupplierQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, string>({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(
        `${endpoints.suppliers.deleteSupplier}/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
