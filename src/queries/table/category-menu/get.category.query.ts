import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetCategoryResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

export const UseGetCategory = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery<TGetCategoryResponse, Error>({
    queryKey: ["Category"],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetCategoryResponse>(
        endpoints.category.getCategory,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
