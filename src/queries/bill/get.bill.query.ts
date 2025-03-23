import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetBill = () => {
  return useQuery({
    queryKey: ["Bill"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.bill.getbill);
      return response.data;
    },
  });
};
