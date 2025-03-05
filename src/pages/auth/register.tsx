import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TUserRegisterSchema,
  userRegisterSchema,
} from "@/schema/auth/user-register-schema";
import { Link, useNavigate } from "react-router-dom";
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
import axiosInstance from "@/services/axios";
import { toast } from "sonner";
import ErrorResponse from "@/types/auth.types";
import endpoints from "@/lib/api.contant";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<TUserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: TUserRegisterSchema) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValue = {
      name: values.name,
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      password: values.password,
    };

    const queryString = new URLSearchParams({
      param1: dialCode,
      param2: phoneNumber,
    }).toString();

    try {
      const response = await axiosInstance.post(
        endpoints.auth.register,
        requiredValue
      );
      toast.success(response.data.message);
      navigate(`/verify?${queryString}`);
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.response?.data?.message;
      toast.error(err);
      form.reset();
    }
  }

  return (
    <div className="flex max-w-lg mx-auto items-center justify-center h-screen px-8">
      <div className="border border-neutral-200 rounded-md w-full p-8 space-y-4">
        <div>
          <h1 className="text-3xl text-netural-700 font-bold">Register</h1>
          <p className="text-normal text-neutral-500">
            Please provide your information to register
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-primary/30"
                      placeholder="Pramis Gurung"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="98XXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="border-primary/30"
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
                      autoComplete="confirm-password"
                      type="password"
                      className="border-primary/30"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="py-4 space-y-2">
              <Button className="w-full rounded-md" type="submit">
                Create Account
              </Button>
              <div className="flex items-center justify-center gap-2">
                <p>Already have an account ?</p>
                <Link
                  className="text-primary hover:text-primary/50"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
