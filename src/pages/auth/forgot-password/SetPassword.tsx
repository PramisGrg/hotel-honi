import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import leftImage from "@/assets/leftImage.png";
import { useForm } from "react-hook-form";
import { setPasswordSchema } from "@/schema/SetPasswordSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/services/axios";
import endpoints from "@/lib/api.contant";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resetToken, setResetToken] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get("resetToken");
    setResetToken(resetToken);
  }, [location.search]);

  async function onSubmit(values: z.infer<typeof setPasswordSchema>) {
    const data = {
      password: values?.password,
      token: resetToken,
    };
    console.log(data);
    try {
      const response = await axiosInstance.post(
        endpoints.auth.setPassword,
        data
      );
      const res = response?.data?.message;
      toast.success(res);
      navigate("/login");
    } catch {
      toast.error("Error occured while changing password");
      reset();
      navigate("/login");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-[#EFECFF]">
      <div className="max-w-[1120px] w-full grid md:grid-cols-2 bg-white ">
        <div className="order-2 md:order-1 flex items-center justify-center w-full p-10">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">Set Password</h1>
                <p className="text-sm">
                  Please provide your information to create account
                </p>
              </div>

              <div>
                <Label id="password">Password</Label>
                <Input
                  type="password"
                  className="bg-[#EFECFF] w-full"
                  placeholder="*******"
                  {...register("password")}
                />{" "}
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label id="confirmpassword">Confirm Password</Label>
                <Input
                  type="password"
                  className="bg-[#EFECFF] w-full "
                  placeholder="*******"
                  {...register("confirmpassword")}
                />
                {errors.confirmpassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmpassword.message}
                  </p>
                )}
              </div>
              <Button
                className="bg-[#2722C0] hover:text-gray-400 duration-400 w-full"
                type="submit"
              >
                Reset Password
              </Button>
              <div className="flex items-center justify-center gap-2">
                <p>Remember Password ?</p>
                <Link
                  className="text-[#2722C0] duration-300 hover:text-gray-300"
                  to="/login"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(${leftImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="order-1 md:order-2 md:block hidden h-[600px] w-full object-cover"
        ></div>
      </div>
    </div>
  );
};

export default SetPassword;
