import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Supplier = {
  name: string;
  address: string;
  contactNumber: string;
  emailAddress: string;
};

export function UseAddSupplierQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (supplier: Supplier) => {
      const response = await axiosAuthInstance.post(
        endpoints.suppliers.addSupplier,
        supplier
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Suppliers"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
