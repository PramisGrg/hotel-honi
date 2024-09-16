import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface useGetSupplierQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const UseGetSupplierQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: useGetSupplierQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery({
    queryKey: ["Suppliers", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.suppliers.getSuppliers,
        {
          params,
        }
      );
      return response.data;
    },
  });
};
