import { DataTypeRoom } from "@/components/popup-table/room-table/edit-room";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditRoomParams {
  id: string;
  data: DataTypeRoom;
}

export function UseEditRoomQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditRoomParams>({
    mutationFn: async ({ id, data }: EditRoomParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(
        `${endpoints.rooms.editRoom}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Rooms"] });
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the category"
      );
      console.log(error);
    },
  });
}
