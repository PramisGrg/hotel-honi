import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UseDeleteRoomQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(
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
      toast.error("Please satisfy the given conditions");
    },
  });
}
