import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export interface CustomerType {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  balance: number;
}

interface CustomerResponse {
  data: CustomerType[];
}
interface GetCustomerQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const useGetCustomerQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: GetCustomerQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery<CustomerResponse>({
    queryKey: ["Customers", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        endpoints.customers.getCustomers,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
