import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetInventoryResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

export const useGetInventory = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery<TGetInventoryResponse>({
    queryKey: ["Inventory"],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetInventoryResponse>(
        endpoints.inventory.getInventory,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
