import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
        `${endpoints.staff.deleteStaff}/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Staff"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
