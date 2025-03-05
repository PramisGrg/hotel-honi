import axiosInstance from "@/services/axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ErrorResponse from "@/types/auth.types";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import leftImage from "../../assets/leftImage.png";
import endpoints from "@/lib/api.contant";

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
      validateOtp(value);
    }
  };

  const validateOtp = async (otp: string) => {
    const { param1, param2 } = params;
    const data = {
      otp: otp,
      dialCode: param1,
      phoneNumber: param2,
      oneSignalId: "oneSignalId123",
    };

    try {
      await axiosInstance.patch(endpoints.auth.register, data);
      toast.success("OTP verified successfully!");
      navigate("/login");
    } catch (error: unknown) {
      const errMessage =
        (error as ErrorResponse)?.response?.data?.message ||
        "OTP verification failed";
      toast.error(errMessage);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[#EFECFF]">
      <div className="bg-red-300 max-w-[1120px] w-full grid md:grid-cols-2">
        <div className="bg-white md:order-1 order-2">
          <div className="space-y-4 flex flex-col items-center justify-center h-[600px]">
            <div className="py-4">
              <h1 className="text-2xl font-bold">Verify OTP</h1>
              <h3 className="text-sm">
                Please enter the OTP sent to your phone number
              </h3>
            </div>

            <InputOTP maxLength={6} onChange={handleChange}>
              <InputOTPGroup className="space-x-2 w-full">
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={0} />
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={1} />
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={2} />
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={3} />
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={4} />
                <InputOTPSlot className="bg-[#EFECFF] w-12 h-12" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <div className="md:order-2 order-1 md:block hidden h-[600px]">
          <img className="h-full w-full object-cover" src={leftImage} />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
