import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  TResetPasswordSchema,
} from "@/schema/auth/reset.password.schma";
import { TResetPassword } from "@/types/auth.types";
import { useResetPasswordQuery } from "@/queries/auth/reset.password.query";

const ResetPassword = () => {
  const resetPassword = useResetPasswordQuery();

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: TResetPasswordSchema) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues: TResetPassword = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
    };

    resetPassword.mutate(requiredValues);
  }

  return (
    <div className="flex max-w-lg mx-auto items-center justify-center h-screen px-8">
      <div className="border border-neutral-200 rounded-md w-full p-8 space-y-4">
        <div>
          <h1 className="text-3xl text-neutral-700 font-bold">
            Reset Password
          </h1>
          <p className="text-normal text-neutral-500">
            Please provide your phone number to reset password
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-4 py-4">
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

export default ResetPassword;
