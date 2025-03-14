import { ColumnDef } from "@tanstack/react-table";
import { DeleteSpace } from "../popup-table/space-table/delete-space";
import { EditSpace } from "../popup-table/space-table/edit-space";

export type SpaceTableColumnsRef = {
  id: string;
  name: string;
};

export const spacecolumns: ColumnDef<SpaceTableColumnsRef>[] = [
  {
    accessorKey: "name",
    header: "Space Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditSpace />
        <DeleteSpace />
      </div>
    ),
  },
];
