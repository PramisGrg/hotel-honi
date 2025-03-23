import endpoints from "@/lib/api.contant";
import { TAddPaymentSchema } from "@/schema/table/payment.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddPaymentSchema>({
    mutationFn: async (payment) => {
      const response = await axiosInstance.post(endpoints.payment, payment);
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
