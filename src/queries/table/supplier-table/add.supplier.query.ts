import endpoints from "@/lib/api.contant";
import { TAddSupplierSchema } from "@/schema/table/customer-and-supplier/add.supplier.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddSupplierQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddSupplierSchema>({
    mutationFn: async (supplier) => {
      const response = await axiosInstance.post(
        endpoints.suppliers.addSupplier,
        supplier
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
