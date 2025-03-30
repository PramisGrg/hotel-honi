import axiosInstance from "@/services/axios";
import { TKotsResponse } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export const useGetKot = (orderId: string | undefined) => {
  return useQuery<TKotsResponse, Error>({
    queryKey: ["Kot", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get<TKotsResponse>(
        `/order/${orderId}/kot/all`
      );
      return response.data;
    },
    enabled: !!orderId, //orderId defined bhaye matra kam garcha natra gardaina
  });
};
