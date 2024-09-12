import { ColumnDef } from "@tanstack/react-table";
import { DeleteSpace } from "../popup-table/space-table/delete-space";
import { EditRoom } from "../popup-table/room-table/edit-room";

export type SpaceTableColumnsRef = {
  id: string;
  name: string;
};

export const spacecolumns: ColumnDef<SpaceTableColumnsRef>[] = [
  {
    accessorKey: "name",
    header: "Space Name",
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ getValue }) => {
  //     const status = getValue() as SpaceTableRef["status"];
  //     const statusClass =
  //       status === "Available" ? "text-green-600" : "text-red-600";
  //     return <span className={statusClass}>{status}</span>;
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditRoom />
        <DeleteSpace />
      </div>
    ),
  },
];
