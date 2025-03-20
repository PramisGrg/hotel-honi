import endpoints from "@/lib/api.contant";
import { TAddSupplierSchema } from "@/schema/table/customer-and-supplier/add.supplier.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditSupplierParams {
  id: string;
  data: TAddSupplierSchema;
}

export function useEditSupplierQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditSupplierParams>({
    mutationFn: async ({ id, data }) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.suppliers.editSupplier}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
    },
  });
}
