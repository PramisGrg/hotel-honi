import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/services/axios";
import ErrorResponse from "@/types";
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyOTP = () => {
  const [params, setParams] = useState<{
    param1?: string | null;
    param2?: string | null;
  }>({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param1 = queryParams.get("param1");
    const param2 = queryParams.get("param2");
    setParams({ param1, param2 });
  }, [location.search]);

  const handleChange = (value: string) => {
    if (value.length === 6) {
      console.log(value);
      validateOtp(value);
    }
  };

  const validateOtp = async (otp: string) => {
    const { param1, param2 } = params;
    const data = {
      otp: otp,
      dialCode: param1,
      phoneNumber: param2,
    };
    try {
      console.log(data);
      const response = await axiosInstance.patch("/auth/register", data);
      console.log(response);
      toast.success("OTP verified successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: unknown) {
      console.log(error);
      const errMessage =
        (error as ErrorResponse)?.response?.data?.message ||
        "OTP verification failed";
      console.log("Pramis");
      toast.error(errMessage);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col text-center text-2xl p-40 space-y-4 font-bold">
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
