import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TGetCustomerResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomerQuery = ({ take = 25, skip = 0, search = "" }) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery<TGetCustomerResponse, Error>({
    queryKey: ["Customers", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosInstance.get<TGetCustomerResponse>(
        endpoints.customers.getCustomers,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
