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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useUpdateUser } from "@/queries/user/update.user.query";
import { useDropzone } from "react-dropzone";
import {
  editUserSchema,
  TEditUserSchema,
} from "@/schema/user/edit.user.schema";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { Delete } from "lucide-react";

const User = () => {
  const { user } = useUserStore();
  const updateUser = useUpdateUser();

  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<TEditUserSchema>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        username: user.username || "",
      });
    }
  }, [user, form]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      form.setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  async function onSubmit(values: TEditUserSchema) {
    const dialCode = values.phoneNumber.slice(1, 4);
    const phoneNumber = values.phoneNumber.slice(4);

    const requiredValues = {
      dialCode: dialCode,
      phoneNumber: phoneNumber,
      name: values.name,
      username: values.username,
      file: values.image,
    };
    updateUser.mutate(requiredValues);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4 border-2 p-6 border-gray-200 rounded-xl">
        <h1 className="font-semibold">Basic Information</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Profile Image
                    </FormLabel>
                    <FormControl>
                      {preview ? (
                        <div className="mt-4 flex gap-4">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover"
                          />
                          <Delete
                            onClick={() => setPreview(null)}
                            className="text-red-400 cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div
                          {...getRootProps()}
                          className="border-2 border-dashed border-primary/30 p-6 text-center cursor-pointer rounded-lg"
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag & drop an image here, or click to select one
                          </p>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your username"
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
                    <FormLabel className="font-semibold">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="98*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Edit user</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default User;
