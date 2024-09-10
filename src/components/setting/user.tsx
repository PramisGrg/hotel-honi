import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "../phone-input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { EditUserSchema } from "@/schema/edit-user-info-schema";
import { useGetUserStore } from "@/store/user-store";
import { useUpdateUser } from "@/queries/user/update-user-query";
import ChangeUserPassword from "@/pages/auth/change-user-password";
import RecentDevices from "../common/recent-devices";

const User = () => {
  const { name, username, phone } = useGetUserStore((state) => ({
    name: state.name,
    username: state.username,
    phone: state.phone,
  }));

  const updateUserMutation = useUpdateUser();

  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: name,
      phoneNumber: `+977${phone}`,
      username: username,
    },
  });

  const handleDiscard = () => {
    form.reset();
  };
  const { isDirty } = form.formState;

  async function onSubmit(values: z.infer<typeof EditUserSchema>) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      name: values.name,
      username: values.username,
    };
    console.log(requiredValues);
    updateUserMutation.mutate(requiredValues);
    form.reset();
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4 border-2 pb-20 p-6 border-gray-100 rounded-xl">
        <div>
          <h1 className="text-sm font-semibold">Basic Information</h1>
          <h4 className="text-sm text-gray-400">
            Edit and view your basic information
          </h4>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
              <div className="flex justify-between p-6 space-x-4">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-72">
                        <FormLabel className="font-semibold">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="current-password"
                            type="text"
                            className="bg-[#EFECFF]"
                            placeholder={name}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-72">
                        <FormLabel className="font-semibold">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            className=""
                            placeholder={phone}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="w-72">
                        <FormLabel className="font-semibold">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#EFECFF]"
                            placeholder={username}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h1>Image Dropbox here</h1>
                  <div className="flex gap-8">
                    <Button
                      type="button"
                      onClick={handleDiscard}
                      className={`${
                        isDirty ? "bg-gray-600" : "bg-gray-200"
                      } duration-300 hover:text-gray-400 w-full`}
                    >
                      Discard Changes
                    </Button>
                    <Button
                      className={`${
                        isDirty ? "bg-blue-600" : "bg-blue-200"
                      } duration-300 hover:text-gray-400 w-full`}
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* component 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border-2  border-gray-100 rounded-xl p-6">
          <ChangeUserPassword />
        </div>
        <div className="border-2  border-gray-100 rounded-xl p-6">
          <RecentDevices />
        </div>
      </div>
    </div>
  );
};

export default User;
