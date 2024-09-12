import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const UseGetTableQuery = () => {
  const params = {
    take: 25,
    skip: 0,
  };
  return useQuery({
    queryKey: ["Tables"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.tables.getTables, {
        params,
      });
      return response.data;
    },
  });
};
