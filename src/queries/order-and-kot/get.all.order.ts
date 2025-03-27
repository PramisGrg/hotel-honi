import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TOrderResponse } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = () => {
  return useQuery<TOrderResponse, Error>({
    queryKey: ["Order"],
    queryFn: async () => {
      const response = await axiosInstance.get<TOrderResponse>(
        endpoints.orderAndKot.getOrder
      );
      return response.data;
    },
  });
};
