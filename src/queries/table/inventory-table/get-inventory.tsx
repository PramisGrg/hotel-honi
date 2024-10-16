import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetInventory = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery({
    queryKey: ["Inventory"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.inventory.getInventory,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
