import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TResetPassword, TResetPasswordResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useResetPasswordQuery = () => {
  const navigate = useNavigate();

  return useMutation<TResetPasswordResponse, TError, TResetPassword>({
    mutationFn: async (value) => {
      toast.loading("Resetting old password...");
      const response = await axiosInstance.post(
        endpoints.auth.resetPasswordSend,
        value
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/verify-password?id=${data.data.id}`);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
