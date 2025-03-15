import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const UseGetCategory = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery({
    queryKey: ["Category"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.category.getCategory, {
        params,
      });
      return response.data;
    },
  });
};
