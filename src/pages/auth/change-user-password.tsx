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
import { UseChangeUserPassword } from "@/queries/user/change-user-password-query";
import { ChangeUserPasswordSchema } from "@/schema/change-user-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangeUserPassword = () => {
  const form = useForm<z.infer<typeof ChangeUserPasswordSchema>>({
    resolver: zodResolver(ChangeUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changeUserPasswordMutation = UseChangeUserPassword();

  async function onSubmit(values: z.infer<typeof ChangeUserPasswordSchema>) {
    const requiredValues = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    console.log(requiredValues);
    changeUserPasswordMutation.mutate(requiredValues);
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <h1 className=" text-black font-semibold">Change Password</h1>
          </div>
          <div className="space-y-6 ">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="bg-[#EFECFF]"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">New Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="bg-[#EFECFF]"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="bg-[#EFECFF]"
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
            <Button
              className="bg-[#2722C0] duration-300 hover:text-gray-400 w-full"
              type="submit"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeUserPassword;
