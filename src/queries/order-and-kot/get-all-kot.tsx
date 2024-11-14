import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export interface KotItem {
  id?: string;
  kotId: string;
  quantity: number;
  status: string;
  item: {
    id: string;
    name: string;
    price: number;
  };
}

export interface Kot {
  id: string;
  kotNumber: number;
  status: string;
  KotItems: KotItem[];
}

export interface KotRepsonse {
  data: Kot[];
}

export const useGetKot = (orderId: string | undefined) => {
  return useQuery<KotRepsonse>({
    queryKey: ["Kot", orderId],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(`/order/${orderId}/kot/all`);
      return response.data;
    },
    enabled: !!orderId, //orderId defined bhaye matra kam garcha natra gardaina
  });
};
