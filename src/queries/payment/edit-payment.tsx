import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditCategoryParamsType {
  id: string;
  name: string;
  remarks: string;
}

export function useEditPaymentMEthod() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditCategoryParamsType>({
    mutationFn: async ({ id, name, remarks }: EditCategoryParamsType) => {
      if (!id) {
        throw new Error("No Payment ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(endpoints.payment, {
        id,
        name,
        remarks,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Payment"] });
      toast.success("Payment method updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the category"
      );
    },
  });
}
