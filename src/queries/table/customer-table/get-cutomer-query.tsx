import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface useGetCustomerQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const UseGetCustomerQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: useGetCustomerQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery({
    queryKey: ["Customers", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.customers.getCustomers,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
