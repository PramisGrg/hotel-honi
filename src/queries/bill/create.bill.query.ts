import endpoints from "@/lib/api.contant";
import { TAddBillDataSchema } from "@/schema/info/add.billing.info";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBill = () => {
  return useMutation<TLoginResponse, TError, TAddBillDataSchema>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.bill.getbill, data);
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
