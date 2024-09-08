import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetUserStore } from "@/store/user-store";

export const useUpdateUser = () => {
  const { username, setName, setUsername, setPhone } = useGetUserStore(
    (state) => ({
      username: state.username,

      setName: state.setName,
      setUsername: state.setUsername,
      setPhone: state.setPhone,
    })
  );

  return useMutation({
    mutationFn: async (data: {
      dialCode: string;
      phoneNumber: string;
      name: string;
      username: string;
    }) => {
      const response = await axiosAuthInstance.patch(
        endpoints.user.updateUser,
        data
      );
      return response.data;
    },

    onSuccess: (data) => {
      setName(data.name);
      setUsername(data.username);
      setPhone(data.phoneNumber);
      console.log(username);
      toast.success("User Updated");
    },

    onError: () => {
      toast.success("Error occured while updating User");
    },
  });
};
