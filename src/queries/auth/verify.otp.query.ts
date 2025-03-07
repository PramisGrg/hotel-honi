import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TLoginResponse, TVerifyOtp } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useVerifyOtpQuery = () => {
  const navigate = useNavigate();

  return useMutation<TLoginResponse, TError, TVerifyOtp>({
    mutationFn: async (value: TVerifyOtp) => {
      toast("Verifying otp...");
      const response = await axiosAuthInstance.patch(
        endpoints.auth.register,
        value
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
