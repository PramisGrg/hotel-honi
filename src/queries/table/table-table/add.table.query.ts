import endpoints from "@/lib/api.contant";
import { TAddTableSchema } from "@/schema/table/room-and-space/add.table.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddTableQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, TAddTableSchema>({
    mutationFn: async (table) => {
      const response = await axiosInstance.post(
        endpoints.tables.addTable,
        table
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
