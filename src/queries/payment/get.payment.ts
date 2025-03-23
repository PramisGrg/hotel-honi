import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface PaymentType {
  id: string;
  name: string;
  remarks: string;
}

interface PaymentResponse {
  data: PaymentType[];
}

export const useGetPayment = () => {
  return useQuery<PaymentResponse>({
    queryKey: ["Payment"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.payment);
      return response.data;
    },
  });
};
