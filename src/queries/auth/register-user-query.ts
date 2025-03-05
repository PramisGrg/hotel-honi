import endpoints from "@/lib/api.contant";
import { TUserRegisterSchema } from "@/schema/auth/user-register-schema";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUserQuery = () => {
  return useMutation({
    mutationFn: async (values: TUserRegisterSchema) => {
      const response = await axiosAuthInstance.post(
        endpoints.auth.register,
        values
      );
      return response.data;
    },
  });
};
