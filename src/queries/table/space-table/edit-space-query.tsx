import { DataTypeSpace } from "@/components/popup-table/space-table/edit-space";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditSpaceParams {
  id: string;
  data: DataTypeSpace;
}

export function UseEditSpaceQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditSpaceParams>({
    mutationFn: async ({ id, data }: EditSpaceParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(
        `${endpoints.spaces.editSpace}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Spaces"] });
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
