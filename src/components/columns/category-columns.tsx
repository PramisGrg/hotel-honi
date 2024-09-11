import { ColumnDef } from "@tanstack/react-table";
import { EditCategory } from "../popup-table/category-table/edit-category";
import { DeleteCategory } from "../popup-table/category-table/delete-category";

export type CategoryColuumnRef = {
  id: string;
  name: string;
};

export const categorycolumns: ColumnDef<CategoryColuumnRef>[] = [
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
