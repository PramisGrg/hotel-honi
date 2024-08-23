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
import background from "../../assets/background.png";
import womenwithtab from "../../assets/women-with-tab.png";
import thunderbolt from "../../assets/thunderbolt.png";
import axiosInstance from "@/services/axios";
import { Toaster, toast } from "sonner";
import ErrorResponse from "@/types";

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
      console.log(requestData);
      const response = await axiosInstance.post("/auth/register", requestData);
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
      navigate(`/verify?${queryString}`);
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.response?.data?.message;
      toast.error(err);
      form.reset();
    }
  }

  return (
    /* From Component */
    <div className="min-h-screen flex items-center w-full justify-center bg-[#EFECFF]">
      <Toaster richColors />
      <div className="flex bg-white w-9/12">
        <div className="w-full p-10 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="text-3xl font-bold pt-4">Create Account</h1>
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
                        className="bg-[#EFECFF] w-full"
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
        {/*This is Static component */}
        <div
          className="flex justify-center items-center w-full p-16 bg-cover"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="h-60 w-60 bg-purple-300 bg-opacity-50 relative rounded-3xl">
            <div className="font-bold text-xl text-white pl-4 pt-4">
              <h1>Get Free</h1>
              <h1>Website with</h1>
              <h1> Booking</h1>
              <h1>Portal</h1>
            </div>
            <img
              className="absolute bottom-10 right-4 scale-150"
              src={womenwithtab}
            />
            <img
              className="bg-white rounded-full absolute bottom-6 -translate-x-4"
              src={thunderbolt}
              alt="thunderbolt logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
