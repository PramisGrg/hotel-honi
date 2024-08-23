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
import background from "../../assets/background.png";
import womenwithtab from "../../assets/women-with-tab.png";
import thunderbolt from "../../assets/thunderbolt.png";
import axiosInstance from "@/services/axios";
import { Toaster, toast } from "sonner";
import ErrorResponse from "@/types";
import { useNavigate } from "react-router-dom";

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
      const response = await axiosInstance.post("/auth/login", requiredValues);
      console.log(response);
      const res = response?.data?.message;
      toast.success(res);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: unknown) {
      const err = (error as ErrorResponse)?.response?.data?.message;
      toast.error(err);
      form.reset();
    }
  }
  return (
    //Form Component
    <div className="min-h-screen flex items-center justify-center bg-[#EFECFF]">
      <Toaster richColors />
      <div className="flex bg-white w-6/10">
        <div className="p-16 w-2/3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" w-full  space-y-2"
            >
              <div>
                <h1 className="text-3xl text-black font-bold pb-1">Log in</h1>
                <p className="text-sm">Please provide your login details</p>
              </div>
              <div className="space-y-4 pt-4">
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
                          className="w-full"
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
                          className="bg-[#EFECFF] w-full"
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

        <div
          className="flex justify-center items-center w-96 bg-cover"
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
