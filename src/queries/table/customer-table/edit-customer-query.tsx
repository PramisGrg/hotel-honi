import { DataTypeCustomer } from "@/components/popup-table/customer-table/edit-customer";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditCustomerParams {
  id: string;
  data: DataTypeCustomer;
}

export function UseEditCustomerQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditCustomerParams>({
    mutationFn: async ({ id, data }: EditCustomerParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      console.log("Mutation ID:", id);
      console.log("Mutation Data:", data);
      const response = await axiosAuthInstance.patch(
        `${endpoints.customers.editCustomer}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Customers"] });
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
