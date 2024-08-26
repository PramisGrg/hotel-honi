import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "@/schema/UserLoginSchema";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/phone-input";
import leftImage from "../../assets/leftImage.png";
import axiosInstance from "@/services/axios";
import ErrorResponse from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import endpoints from "@/lib/api.contant";

const CreateAccount = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userLoginSchema>) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      password: values.password,
    };
    console.log(requiredValues);
    try {
      const response = await axiosInstance.post(endpoints.auth.login, requiredValues);
      const res = response?.data?.message;
      toast.success(res);
      navigate("/dashboard");
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
                  <h1 className="text-3xl text-black font-bold pb-1">Log in</h1>
                  <p className="text-sm">Please provide your login details</p>
                </div>
                <div className="space-y-4 ">
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="bg-[#EFECFF]"
                            placeholder="*******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <div className="flex justify-end pb-2">
                    <Link
                      className="text-[#2722C0] duration-300 text-right hover:text-gray-300"
                      to="/forgot"
                    >
                      Forgot password ?
                    </Link>
                  </div>
                  <Button
                    className="bg-[#2722C0] duration-300 hover:text-gray-400 w-full"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
                <div className="flex gap-2">
                  <p>Don't have an account ?</p>
                  <Link
                    className="text-[#2722C0] duration-300 hover:text-gray-300"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="order-1 md:order-2 h-[600px]">
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

export default CreateAccount;
