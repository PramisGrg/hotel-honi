import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface PaymentType {
  id: string;
  name: string;
}

interface PaymentResponse {
  data: PaymentType[];
}

export const useGetPayment = () => {
  return useQuery<PaymentResponse>({
    queryKey: ["Payment"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.payment);
      return response.data;
    },
  });
};
