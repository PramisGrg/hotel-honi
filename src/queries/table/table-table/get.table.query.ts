import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TTableResponse } from "@/types/order.types";
import { useQuery } from "@tanstack/react-query";

interface UseGetTableQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const useGetTableQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: UseGetTableQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery<TTableResponse, Error>({
    queryKey: ["Tables", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosInstance.get<TTableResponse>(
        endpoints.tables.getTables,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
