import endpoints from "@/lib/api.contant";
import { TAddRoomSchema } from "@/schema/table/room-and-space/add.room.schema";
import axiosInstance from "@/services/axios";
import { TLoginResponse } from "@/types/auth.types";
import { TError } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditRoomParams {
  selectRoomId: string;
  data: TAddRoomSchema;
}

export function useEditRoomQuery() {
  const queryClient = useQueryClient();
  return useMutation<TLoginResponse, TError, EditRoomParams>({
    mutationFn: async ({ selectRoomId, data }) => {
      if (!selectRoomId) {
        throw new Error("No room ID provided for editing");
      }
      const response = await axiosInstance.patch(
        `${endpoints.rooms.editRoom}/${selectRoomId}`,
        data
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
