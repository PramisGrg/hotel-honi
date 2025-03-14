import endpoints from "@/lib/api.contant";
import { TAddTableSchema } from "@/schema/table/room-and-space/add.table.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditTableParams {
  id: string | undefined;
  data: TAddTableSchema;
}

export function useEditTableQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditTableParams>({
    mutationFn: async ({ id, data }: EditTableParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.tables.editTable}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Tables"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
