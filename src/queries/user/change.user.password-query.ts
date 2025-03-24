import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface TChangePassword {
  currentPassword: string;
  newPassword: string;
}

export const UseChangeUserPassword = () => {
  return useMutation<TLoginResponse, TError, TChangePassword>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(
        endpoints.user.changeUserPassword,
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
