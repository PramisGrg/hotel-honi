import endpoints from "@/lib/api.contant";
import axiosInstance from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Order {
  orderFor: string;
  spaceId: string;
  items: {
    itemId: string;
    quantity: number;
  }[];
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      const response = await axiosInstance.post(
        endpoints.orderAndKot.createOrder,
        order
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Order"] });
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Please satisfy the given conditions");
    },
  });
}
