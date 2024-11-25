import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface StaffMember {
  user: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  role: {
    name: string;
  };
}

interface StaffResponse {
  data: StaffMember[];
}
export const useGetStaff = () => {
  return useQuery<StaffResponse>({
    queryKey: ["Staff"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.staff.getStaff);
      return response.data;
    },
  });
};
