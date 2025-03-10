import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { TLoginResponse, TUserLogin } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginUserQuery = () => {
  const navigate = useNavigate();

  return useMutation<TLoginResponse, TError, TUserLogin>({
    mutationFn: async (loginValues: TUserLogin) => {
      toast.loading("Logging in...");
      const response = await axiosInstance.post<TLoginResponse>(
        endpoints.auth.login,
        loginValues
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      Cookies.set("token", data.data.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
};
