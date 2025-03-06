import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "@/schema/auth/user.login.schema";
import { Link } from "react-router-dom";
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
import { TUserLoginSchema } from "@/schema/auth/user.login.schema";
import { useLoginUserQuery } from "@/queries/auth/login.user.query";
import { TUserLogin } from "@/types/auth.types";

const Login = () => {
  const userLogin = useLoginUserQuery();

  const form = useForm<TUserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: TUserLoginSchema) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues: TUserLogin = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      password: values.password,
    };

    userLogin.mutate(requiredValues);

    // try {
    //   const response = await axiosInstance.post(
    //     endpoints.auth.login,
    //     requiredValues
    //   );
    //   Cookies.set("token", response.data.data.token);
    //   const res = response?.data?.message;
    //   const activeHotelId = response?.data?.data?.activeHotelId;
    //   toast.success(res);
    //   if (activeHotelId) {
    //     navigate("/dashboard/home");
    //   } else {
    //     navigate("/onboarding");
    //   }
    // } catch (error: unknown) {
    //   const err = (error as ErrorResponse)?.response?.data?.message;
    //   toast.error(err);
    //   form.reset();
    // }
  }
  return (
    <div className="flex max-w-lg mx-auto items-center justify-center h-screen px-8">
      <div className="border border-neutral-200 rounded-md w-full p-8 space-y-4">
        <div>
          <h1 className="text-3xl text-netural-700 font-bold">Log in</h1>
          <p className="text-normal text-neutral-500">
            Please provide your login details
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="98XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        autoComplete="current-password"
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="py-2">
              <div className="flex justify-end pb-2">
                <Link
                  className="text-primary hover:text-primary/50"
                  to="/resetpassword"
                >
                  Forgot password ?
                </Link>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
            <div className="flex gap-2">
              <p>Don't have an account ?</p>
              <Link
                className="text-primary hover:text-primary/50"
                to="/register"
              >
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
