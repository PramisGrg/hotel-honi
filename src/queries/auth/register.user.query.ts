import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { TLoginResponse, TUserRegister } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegisterUserQuery = () => {
  const navigate = useNavigate();

  return useMutation<TLoginResponse, TError, TUserRegister>({
    mutationFn: async (values: TUserRegister) => {
      const response = await axiosAuthInstance.post(
        endpoints.auth.register,
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      const queryParams = new URLSearchParams({
        dialCode: data.data.dialCode,
        phoneNumber: data.data.phoneNumber,
      });
      toast.success(data.message);
      navigate(`/verify?${queryParams.toString()}`);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
