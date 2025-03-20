import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TError } from "@/types/error.type";
import { TGetCustomerResponse } from "@/types/table.types";
import { useQuery } from "@tanstack/react-query";

export const UseGetSupplierQuery = ({ take = 25, skip = 0, search = "" }) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery<TGetCustomerResponse, TError>({
    queryKey: ["Suppliers", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        endpoints.suppliers.getSuppliers,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
