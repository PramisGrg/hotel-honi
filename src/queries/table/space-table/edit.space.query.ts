import endpoints from "@/lib/api.contant";
import { TAddSpaceSchema } from "@/schema/table/room-and-space/add.space.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditSpaceParams {
  id: string | undefined;
  name: TAddSpaceSchema;
}

export function useEditSpaceQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditSpaceParams>({
    mutationFn: async ({ id, name }: EditSpaceParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.spaces.editSpace}/${id}`,
        name
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Spaces"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
