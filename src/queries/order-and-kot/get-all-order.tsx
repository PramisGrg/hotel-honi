import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = () => {
  return useQuery({
    queryKey: ["Order"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.orderAndKot.getOrder
      );
      return response.data;
    },
  });
};
