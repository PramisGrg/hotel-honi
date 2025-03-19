import endpoints from "@/lib/api.contant";
import { TAddCustomerSchema } from "@/schema/table/customer-and-supplier/add.customer.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddCustomerQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddCustomerSchema>({
    mutationFn: async (customer) => {
      const response = await axiosInstance.post(
        endpoints.customers.addCustomer,
        customer
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Customers"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
