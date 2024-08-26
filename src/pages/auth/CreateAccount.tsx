import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userRegisterSchema } from "@/schema/RegisterUserSchema";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import ErrorResponse from "@/types";
import endpoints from "@/lib/api.contant";

const CreateAccount = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requestData = {
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
      const response = await axiosInstance.post(endpoints.auth.register, requestData);
      toast.success(response.data.message);
      navigate(`/verify?${queryString}`);
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.response?.data?.message;
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
                <h1 className="text-3xl font-bold">Create Account</h1>
                <p className="text-sm">
                  Please provide your information to create account
                </p>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-[#EFECFF] w-full"
                          placeholder="Lal Kumar Pun"
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
                        <PhoneInput
                          className="bg-[#EFECFF] w-full"
                          placeholder="98XXXXXXXX"
                          {...field}
                        />
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
                  Create Account
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <p>Already have an account ?</p>
                  <Link
                    className="text-[#2722C0] duration-300 hover:text-gray-300"
                    to="/login"
                  >
                    Login
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
          className="order-1 md:order-2 h-full w-full object-cover"
        ></div>
      </div>
    </div>
  );
};

export default CreateAccount;
