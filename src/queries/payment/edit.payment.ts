import endpoints from "@/lib/api.contant";
import { TAddPaymentSchema } from "@/schema/table/payment.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditCategoryParamsType {
  id: string;
  data: TAddPaymentSchema;
}

export function useEditPaymentMethod() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditCategoryParamsType>({
    mutationFn: async ({ id, data }: EditCategoryParamsType) => {
      if (!id) {
        throw new Error("No Payment ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.payment}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Payment"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
