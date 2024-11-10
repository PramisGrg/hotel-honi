import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditStaffParams {
  staffId: string;
  role: {
    type: string;
    id: string;
  };
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditStaffParams>({
    mutationFn: async (data: EditStaffParams) => {
      const response = await axiosAuthInstance.patch(
        endpoints.staff.updateStaff,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Staff"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the category"
      );
      console.log(error);
    },
  });
}
