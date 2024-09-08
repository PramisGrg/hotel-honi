import React, { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import { editProfileSchema } from "@/schema/EditProfileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { MdOutlineCloudUpload, MdDelete } from "react-icons/md";

const Settings = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      username: "",
      image: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
  };

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    console.log(values);
  }

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full max-w-[1000px] mx-auto p-8">
        <div className="py-10">
          <h1 className="text-xl font-semibold">Edit Profile</h1>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
                <div className="space-y-4 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#EFECFF]"
                            placeholder="Pramis Gurung"
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
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput placeholder="98XXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-[#EFECFF]"
                            placeholder="@kalu2024"
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
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Upload Image
                        </FormLabel>
                        <FormControl>
                          <div className="w-full h-56 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative">
                            <Input
                              type="file"
                              accept="image/*"
                              className="opacity-0 w-full h-full cursor-pointer"
                              onChange={handleImageChange}
                            />
                            {imagePreview ? (
                              <div className="w-full h-full flex justify-center items-center">
                                <img
                                  src={imagePreview}
                                  alt="Selected"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={handleDeleteImage}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-400"
                                >
                                  <MdDelete className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-center absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                                <MdOutlineCloudUpload className="w-12 h-12 text-blue-500" />
                                <p className="text-sm text-gray-500">
                                  Drop files here or click to upload
                                </p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="py-10 flex justify-center">
                <Button
                  className="bg-[#2722C0] duration-300 hover:text-gray-400 w-1/2"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
