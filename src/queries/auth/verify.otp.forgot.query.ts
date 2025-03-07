import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TVerifyForgotOtp, TVerifyForgotOtpResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useVerifyOtpForgotQuery = () => {
  const navigate = useNavigate();
  //   try {
  //     const response = await axiosInstance.post(endpoints.auth.verifyOTP, data);
  //     toast.success("OTP verified successfully!");
  //     console.log(response, "This is response");
  //     const resetToken = response.data.data.resetToken;
  //     navigate(`/setpassword?resetToken=${resetToken}`);
  //   } catch (error: unknown) {
  //     const errMessage =
  //       error?.response?.data?.message || "OTP verification failed";
  //     toast.error(errMessage);
  //     navigate("/");
  //   }
  // };

  return useMutation<TVerifyForgotOtpResponse, TError, TVerifyForgotOtp>({
    mutationFn: async (data: TVerifyForgotOtp) => {
      toast("Verifying otp...");
      const response = await axiosAuthInstance.post(
        endpoints.auth.verifyOTP,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      const resetToken = data.data.resetToken;
      toast.success(data.message);
      navigate(`/set-password?resetToken=${resetToken}`);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      navigate("/");
    },
  });
};
