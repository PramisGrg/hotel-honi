import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpQuery } from "@/queries/auth/verify.otp.query";
import { useEffect, useState } from "react";
import { TVerifyOtp } from "@/types/auth.types";

interface TParams {
  dialCode: string | null;
  phoneNumber: string | null;
}

const VerifyOTP = () => {
  const [params, setParams] = useState<TParams>({
    dialCode: null,
    phoneNumber: null,
  });
  const verifyOtp = useVerifyOtpQuery();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dialCode = queryParams.get("dialCode");
    const phoneNumber = queryParams.get("phoneNumber");
    setParams({ dialCode, phoneNumber });
  }, []);

  const handleOtp = (otp: string) => {
    if (otp.length === 6) {
      validateOtp(otp);
    }
  };

  const validateOtp = async (otp: string) => {
    const { dialCode, phoneNumber } = params;
    const requiredData: TVerifyOtp = {
      otp: otp,
      dialCode,
      phoneNumber,
    };

    verifyOtp.mutate(requiredData);
  };

  return (
    <div className="flex max-w-lg mx-auto items-center justify-center h-screen px-8">
      <div className="flex flex-col justify-center border rounded-md px-8 space-y-8 min-h-[300px]">
        <div className="space-y-2">
          <h1 className="text-3xl text-neutral-700 font-bold">Verify OTP</h1>
          <p className="text-normal text-neutral-500">
            Use 888888 to validate otp
          </p>
        </div>
        <InputOTP maxLength={6} onChange={handleOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export default VerifyOTP;
