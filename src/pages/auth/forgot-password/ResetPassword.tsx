import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ResetPasswordSchema } from "@/schema/ResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import leftImage from "../../../assets/leftImage.png";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "@/services/axios";
import { toast } from "sonner";
import endpoints from "@/lib/api.contant";
import ErrorResponse from "@/types";
import Cookies from "js-cookie";

interface IAuthResetPasswordResponse {
  message: string;
  data: {
    id: string;
    token: string;
  };
}

const ResetPassword = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axiosInstance.post(
        endpoints.auth.resetPasswordSend,
        requiredValues
      );

      if (!response.data) {
        throw new Error("An unexpected error occoured");
      }
      const responseData: IAuthResetPasswordResponse = response.data;
      const res = responseData.message;
      const cookie = responseData.data.id;
      toast.success(res);
      Cookies.set("token", cookie);
      navigate("/verify");
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.response?.data?.message;
      toast.error(err);
      form.reset();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[#EFECFF]">
      <div className="grid max-w-[1120px] w-full md:grid-cols-2 bg-white border">
        <div className="p-8 order-2 md:order-1 flex items-center justify-center">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div>
                  <h1 className="text-3xl text-black font-bold pb-1">
                    Reset Password
                  </h1>
                  <p className="text-sm">
                    Please enter your phone number to reset password
                  </p>
                </div>
                <div className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            className=""
                            placeholder="98XXXXXXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <Button
                    className="bg-[#2722C0] duration-300 hover:text-gray-400 w-full"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </div>
                <div className="flex gap-2 justify-center">
                  <p>Remember password</p>
                  <Link
                    className="text-[#2722C0] duration-300 hover:text-gray-300"
                    to="/register"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="md:block hidden order-1 md:order-2 h-[600px]">
          <img
            className="h-full w-full object-cover"
            src={leftImage}
            alt="Left Side Image"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
