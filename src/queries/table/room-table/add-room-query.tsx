import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Rooms = {
  name: string;
  price: string;
  capacity: number;
};

export function UseAddRoomQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (room: Rooms) => {
      const response = await axiosAuthInstance.post(
        endpoints.rooms.addRoom,
        room
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Rooms"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
