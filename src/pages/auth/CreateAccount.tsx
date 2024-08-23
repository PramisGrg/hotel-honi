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

const CreateAccount = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      fullname: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof userRegisterSchema>) {
    console.log("Pramis");
    console.log(values);
    navigate("/login");
  }
  return (
    /* From Component */
    <div className="min-h-screen flex items-center justify-center bg-[#EFECFF]">
      <div className="flex bg-white">
        <div className="w-96 p-6 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="text-3xl font-bold pt-4">Create Account</h1>
              <p className="text-sm">
                Please provide your information to create account
              </p>
              <FormField
                control={form.control}
                name="fullname"
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
                name="phonenumber"
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-[#2722C0] hover:text-gray-300 duration-300 w-full"
                type="submit"
              >
                Create Account
              </Button>
              <div className="flex items-center justify-center gap-2">
                <p>Already have an account ?</p>
                <Link
                  className="text-[#2722C0] hover:text-[#110f46]"
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
