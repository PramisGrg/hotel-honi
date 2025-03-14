import endpoints from "@/lib/api.contant";
import { TAddRoomSchema } from "@/schema/table/room-and-space/add.room.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddRoomQuery() {
  const queryClient = useQueryClient();

  return useMutation<TLoginResponse, TError, TAddRoomSchema>({
    mutationFn: async (values) => {
      const response = await axiosInstance.post(
        endpoints.rooms.addRoom,
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Rooms"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
}
