import axiosInstance from "@/services/axios";
import { Toaster, toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ErrorResponse from "@/types";

const VerifyOTP = () => {
  const handleChange = (value: string) => {
    if (value.length === 6) {
      console.log(value);
      validateOtp(value);
    }
  };

  const validateOtp = async (otp: string) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", { otp });
      console.log(response);
      toast.success("OTP verified successfully!");
    } catch (error: unknown) {
      const errMessage =
        (error as ErrorResponse)?.response?.data?.message ||
        "OTP verification failed";
      toast.error(errMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col text-center text-2xl space-y-4 font-bold">
        <div>Verify OTP</div>
        <div>
          <InputOTP maxLength={6} onChange={handleChange}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default VerifyOTP;
