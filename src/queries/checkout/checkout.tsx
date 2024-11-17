import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CheckoutType {
  orderId: string;
  paymentDetails: {
    paymentMethodId: string;
    amount: number;
    isChangeMoneyReturned?: boolean;
  };
  isCustomBill?: true;
  discount?: string;
  discountType?: string;
  serviceCharge?: string;
  serviceChargeType?: string;
  customerId?: string;
  staffId?: string;
}

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (checkout: CheckoutType) => {
      const response = await axiosAuthInstance.post(
        endpoints.checkout,
        checkout
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error, "This is error");
    },
  });
};
