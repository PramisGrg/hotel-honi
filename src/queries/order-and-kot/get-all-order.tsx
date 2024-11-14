import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export interface KotItem {
  id?: string;
  quantity: number;
  status?: string;
  item: {
    name: string;
  };
}

export interface Kot {
  id: string;
  type: string;
  KotItems: KotItem[];
}

export interface Order {
  id: string;
  orderNumber: number;
  status: string;
  table: {
    name: string;
  };
  kots: Kot[];
}

export interface OrderResponse {
  data: Order[];
}

export const useGetOrder = () => {
  return useQuery<OrderResponse>({
    queryKey: ["Order"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.orderAndKot.getOrder
      );
      return response.data;
    },
  });
};
