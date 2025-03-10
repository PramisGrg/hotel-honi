import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TResetPasswordResponse, TSetPassword } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useSetPasswordQuery = () => {
  const navigate = useNavigate();

  return useMutation<TResetPasswordResponse, TError, TSetPassword>({
    mutationFn: async (value: TSetPassword) => {
      toast.loading("Setting new password...");
      const response = await axiosAuthInstance.post(
        endpoints.auth.setPassword,
        value
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: () => {
      toast.error("Reset Token is invalid or expired");
      navigate("/");
    },
  });
};
