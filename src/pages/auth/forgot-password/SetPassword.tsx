import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorResponse, Link } from "react-router-dom";
import leftImage from "@/assets/leftImage.png";
import { useForm } from "react-hook-form";
import { setPasswordSchema } from "@/schema/SetPasswordSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axiosInstance from "@/services/axios";
import endpoints from "@/lib/api.contant";
import { toast } from "sonner";

const SetPassword = () => {
  const resetToken = Cookies.get("resetToken");
  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

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
      console.log(response);
      const res = response?.data?.message;
      toast.success(res);
      console.log(response);
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.data?.message;
      toast.error(err);
      form.reset();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-[#EFECFF]">
      <div className="max-w-[1120px] w-full grid md:grid-cols-2 bg-white ">
        <div className="order-2 md:order-1 flex items-center justify-center w-full p-10">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <h1 className="text-3xl font-bold">Set Password</h1>
                  <p className="text-sm">
                    Please provide your information to create account
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-[#EFECFF] w-full"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-[#EFECFF] w-full "
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
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
            </Form>
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
