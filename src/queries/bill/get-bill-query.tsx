import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBill = () => {
  return useQuery({
    queryKey: ["Bill"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.bill.getbill);
      return response.data;
    },
  });
};
