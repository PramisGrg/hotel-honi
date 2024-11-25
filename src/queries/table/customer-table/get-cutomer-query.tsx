import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
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

export const UseGetCustomerQuery = ({
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
