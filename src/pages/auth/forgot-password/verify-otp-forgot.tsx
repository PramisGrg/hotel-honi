import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpForgotQuery } from "@/queries/auth/verify.otp.forgot.query";
import { TVerifyForgotOtp } from "@/types/auth.types";
import { useEffect, useState } from "react";

const VerifyOtpForgot = () => {
  const [id, setId] = useState<string | null>(null);

  const verifyForgotOtp = useVerifyOtpForgotQuery();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    setId(id);
  }, []);

  const handleOtp = (otp: string) => {
    if (otp.length === 6) {
      validateOtp(otp);
    }
  };

  const validateOtp = (otp: string) => {
    const requiredData: TVerifyForgotOtp = {
      id,
      otp,
    };
    verifyForgotOtp.mutate(requiredData);
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

export default VerifyOtpForgot;
