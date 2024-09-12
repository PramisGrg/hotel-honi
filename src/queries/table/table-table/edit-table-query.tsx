import { DataTypeTable } from "@/components/popup-table/table-table/edit-table";
import endpoints from "@/lib/api.contant";
import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditTableParams {
  id: string;
  data: DataTypeTable;
}

export function UseEditTableQuery() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, EditTableParams>({
    mutationFn: async ({ id, data }: EditTableParams) => {
      if (!id) {
        throw new Error("No menu item ID provided for editing");
      }
      const response = await axiosAuthInstance.patch(
        `${endpoints.tables.editTable}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Tables"] });
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
