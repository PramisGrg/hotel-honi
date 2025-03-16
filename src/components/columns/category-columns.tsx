import { ColumnDef } from "@tanstack/react-table";
import { EditCategory } from "../popup-table/category-table/edit-category";
import { DeleteCategory } from "../popup-table/category-table/delete-category";
import { TGetCategoryResponseData } from "@/types/table.types";

export const categorycolumns: ColumnDef<TGetCategoryResponseData>[] = [
  {
    accessorKey: "name",
    header: " Category Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditCategory />
        <DeleteCategory />
      </div>
    ),
  },
];
