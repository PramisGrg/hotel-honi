import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosInstance from "@/services/axios";
import ErrorResponse from "@/types";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import leftImage from "../../assets/leftImage.png";
import Cookies from "js-cookie";
import endpoints from "@/lib/api.contant";

const VerifyOTP = () => {
  const [params, setParams] = useState<{
    param1?: string | null;
    param2?: string | null;
  }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");

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

  const handleResendOTP = async () => {
    const id = {
      id: token,
    };
    console.log(id);
    try {
      const response = await axiosInstance.post(
        endpoints.auth.verifyOTPResend,
        id
      );
      const res = response?.data?.message;
      toast.success(res);
    } catch (error) {
      console.log(error);
    }
  };

  const validateOtp = async (otp: string) => {
    let data;

    if (token) {
      data = {
        otp: otp,
        id: token,
      };
    } else {
      const { param1, param2 } = params;
      data = {
        otp: otp,
        dialCode: param1,
        phoneNumber: param2,
      };
    }

    try {
      if (token) {
        console.log(data);
        const response = await axiosInstance.post(
          endpoints.auth.verifyOTP,
          data
        );
        const resetToken = response?.data?.data?.resetToken;
        Cookies.set("resetToken", resetToken);
        navigate("/setpassword");
      } else {
        await axiosInstance.patch(endpoints.auth.register, data);
        toast.success("OTP verified successfully!");
        navigate("/login");
      }
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
            {token && (
              <div className="flex gap-2">
                <p>Didn't get the OTP code </p>
                <button
                  onClick={handleResendOTP}
                  className="text-blue-700 hover:text-blue-400 duration-300"
                >
                  Resend
                </button>
              </div>
            )}
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
