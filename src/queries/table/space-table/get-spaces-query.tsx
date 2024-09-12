import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

interface UseGetSpaceQueryParams {
  take?: number;
  skip?: number;
  search?: string;
}

export const UseGetSpaceQuery = ({
  take = 25,
  skip = 0,
  search = "",
}: UseGetSpaceQueryParams) => {
  const params = {
    take,
    skip,
    search,
  };

  return useQuery({
    queryKey: ["Spaces", { take, skip, search }],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(endpoints.spaces.getSpaces, {
        params,
      });
      return response.data;
    },
  });
};
