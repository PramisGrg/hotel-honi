import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
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

  return useQuery({
    queryKey: ["Tables", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.tables.getTables, {
        params,
      });
      return response.data;
    },
  });
};
