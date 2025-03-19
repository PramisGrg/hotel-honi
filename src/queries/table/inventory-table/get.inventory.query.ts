import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import {
  TGetInventoryResponse,
  TGetInventoryResponseData,
} from "@/types/table.types";
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

export const useGetInventoryById = (inventoryId: string) => {
  return useQuery<TGetInventoryResponseData>({
    queryKey: ["Inventory", inventoryId],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetInventoryResponseData>(
        `${endpoints.inventory.getInventoryById}/${inventoryId}`
      );
      return response.data;
    },
  });
};
