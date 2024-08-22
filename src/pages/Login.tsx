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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/phone-input";

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
      <div className="flex bg-white"></div>
      <div className="container mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormDescription className="text-3xl text-black font-bold pt-24">
              Create Account
            </FormDescription>
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      className="bg-[#EFECFF] w-1/2"
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
                      className="bg-[#EFECFF] w-1/2"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="bg-[#2722C0] w-1/2" type="submit">
              Login{" "}
            </Button>
            <div className="flex pl-24 gap-2">
              <p>Already have an account ?</p>
              <Link to="/create">Register</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
