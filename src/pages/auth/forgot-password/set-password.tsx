import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  setPasswordSchema,
  TSetPasswordSchema,
} from "@/schema/auth/set.password.schema";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { TSetPassword } from "@/types/auth.types";
import { useSetPasswordQuery } from "@/queries/auth/set.password.query";

const SetPassword = () => {
  const [token, setToken] = useState<string | null>(null);

  const setPassword = useSetPasswordQuery();

  const form = useForm<TSetPasswordSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const resetToken = queryParams.get("resetToken");
    setToken(resetToken);
  }, []);

  async function onSubmit(values: TSetPasswordSchema) {
    const requiredData: TSetPassword = {
      password: values?.password,
      token,
    };

    setPassword.mutate(requiredData);
  }

  return (
    <div className="flex max-w-lg mx-auto items-center justify-center h-screen px-8">
      <div className="border border-neutral-200 rounded-md w-full p-8 space-y-4">
        <div>
          <h1 className="text-3xl text-neutral-700 font-bold">Set Password</h1>
          <p className="text-normal text-neutral-500">
            Please provide new password
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
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
                    <FormLabel className="font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="py-2">
              <Button className="w-full" type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex gap-2">
          <p>Remembered password ?</p>
          <Link className="text-primary hover:text-primary/50" to="/login">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
