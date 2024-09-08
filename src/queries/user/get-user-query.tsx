import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

// interface UserData {
//   id: string;
//   name: string;
//   phoneNumber: string;
// }

// interface GetUserData {
//   data: UserData[];
// }

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.user.getUser);
      return response.data;
    },
  });
};
