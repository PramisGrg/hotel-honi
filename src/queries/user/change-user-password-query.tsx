import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const UseChangeUserPassword = () => {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const response = await axiosAuthInstance.patch(
        endpoints.user.changeUserPassword,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      console.log(data);
      toast.success("Password changed Successfully");
    },

    onError: (data) => {
      console.log(data, "🙂‍↕️🙂‍↕️🙂‍↕️");
      toast.error("Password did not match");
    },
  });
};
