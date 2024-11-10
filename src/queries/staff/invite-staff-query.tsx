import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useInviteStaff = () => {
  return useMutation({
    mutationFn: async (data: {
      dialCode: string;
      phoneNumber: string;
      role: {
        type: string;
        id: string;
      };
    }) => {
      const response = await axiosAuthInstance.post(
        endpoints.staff.inviteStaff,
        data
      );
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
    },

    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message: string })
        ?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });
};
