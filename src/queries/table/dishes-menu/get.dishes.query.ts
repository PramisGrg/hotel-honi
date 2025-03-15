import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDishes = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery({
    queryKey: ["Dishes"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.dishes.getDishes, {
        params,
      });
      return response.data;
    },
  });
};
