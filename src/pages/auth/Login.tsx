import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "@/schema/UserLoginSchema";
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

const CreateAccount = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      phonenumber: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userLoginSchema>) {
    console.log("Pramis");
    console.log(values);
    navigate("/");
  }
  return (
    //Form Component
    <div className="min-h-screen flex items-center justify-center bg-[#EFECFF]">
      <div className="flex bg-white">
        <div className="p-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div>
                <h1 className="text-3xl text-black font-bold pb-1">Log in</h1>
                <p className="text-sm">Please provide your login details</p>
              </div>
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="phonenumber"
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2">
                <div className="flex justify-end pb-2">
                  <Link
                    className="text-[#2722C0] text-right hover:text-[#110f46]"
                    to="/forgot"
                  >
                    Forgot password ?
                  </Link>
                </div>
                <Button
                  className="bg-[#2722C0] hover:text-gray-400 w-full"
                  type="submit"
                >
                  Login
                </Button>
              </div>
              <div className="flex gap-2">
                <p>Don't have an account ?</p>
                <Link
                  className="text-[#2722C0] hover:text-[#110f46]"
                  to="/create"
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
