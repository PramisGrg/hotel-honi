import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TDishesResponse } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

export const useGetDishesQuery = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery<TDishesResponse, Error>({
    queryKey: ["Dishes"],
    queryFn: async () => {
      const response = await axiosInstance.get<TDishesResponse>(
        endpoints.dishes.getDishes,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
