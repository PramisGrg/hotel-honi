import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetStaff = () => {
  return useQuery({
    queryKey: ["Staff"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.staff.getStaff);
      return response.data;
    },
  });
};
