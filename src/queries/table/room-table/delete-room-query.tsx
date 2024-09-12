import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UseDeleteRoomQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuthInstance.delete(
        `${endpoints.rooms.deleteRoom}/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Rooms"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.log(error);
      console.log("HEHEHEHE");
      toast.error("Please satisfy the given conditions");
    },
  });
}
