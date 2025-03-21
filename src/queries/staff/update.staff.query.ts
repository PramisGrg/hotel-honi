import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditStaffParams {
  staffId: string | undefined;
  role: {
    type: string;
    id: string;
  };
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditStaffParams>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(
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
      toast.error(error.response.data.message);
    },
  });
}
