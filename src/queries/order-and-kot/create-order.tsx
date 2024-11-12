import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Order = {
  orderFor: string;
  spaceId: string;
  items: [
    {
      itemId: string;
      quantity: number;
    }
  ];
};

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      const response = await axiosAuthInstance.post(
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
