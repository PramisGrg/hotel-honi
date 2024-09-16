import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Customers = {
  name: string;
  address: string;
  contactNumber: string;
  emailAddress: string;
};

export function UseAddCustomerQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (customer: Customers) => {
      const response = await axiosAuthInstance.post(
        endpoints.customers.addCustomer,
        customer
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Customers"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
