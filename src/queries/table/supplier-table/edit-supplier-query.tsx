import { DataTypeCustomer } from "@/components/popup-table/customer-table/edit-customer";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditSupplierParams {
  id: string;
  data: DataTypeCustomer;
}

export function UseEditSupplierQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditSupplierParams>({
    mutationFn: async ({ id, data }: EditSupplierParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      console.log("Mutation ID:", id);
      console.log("Mutation Data:", data);
      const response = await axiosAuthInstance.patch(
        `${endpoints.suppliers.editSupplier}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
      toast.success("Customer updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the menu item"
      );
      console.log(error);
    },
  });
}
