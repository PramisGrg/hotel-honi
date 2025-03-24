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
import { UseChangeUserPassword } from "@/queries/user/change.user.password-query";
import {
  changeUserPasswordSchema,
  TChangeUserPasswordSchema,
} from "@/schema/user/change.password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ChangeUserPassword = () => {
  const form = useForm<TChangeUserPasswordSchema>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changeUserPasswordMutation = UseChangeUserPassword();

  const { isDirty } = form.formState;

  async function onSubmit(values: TChangeUserPasswordSchema) {
    const requiredValues = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    changeUserPasswordMutation.mutate(requiredValues);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4 border-2 p-6 border-gray-200 rounded-xl">
        <h1 className="font-semibold">Change Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="border-primary/30 focus:border-none"
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
                  <FormLabel className="font-semibold">New Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="border-primary/30 focus:border-none"
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
                  <FormLabel className="font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      className="border-primary/30 focus:border-none"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            <div className="py-2">
              <Button disabled={!isDirty} type="submit">
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangeUserPassword;
