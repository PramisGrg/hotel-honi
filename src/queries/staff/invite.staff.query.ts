import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";

interface TInviteStaff {
  dialCode: string;
  phoneNumber: string;
  role: {
    type: string;
    id: string;
  };
}

export const useInviteStaff = () => {
  return useMutation<TLoginResponse, TError, TInviteStaff>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        endpoints.staff.inviteStaff,
        data
      );
      return response?.data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
