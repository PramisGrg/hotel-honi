import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { TEditUser } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUser = () => {
  return useMutation<TLoginResponse, TError, TEditUser>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(
        endpoints.user.updateUser,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
