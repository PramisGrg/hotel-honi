import { ColumnDef } from "@tanstack/react-table";
import { EditMenuItems } from "../popup-table/dishes-table/edit-menu";
import { DeleteMenuItems } from "../popup-table/dishes-table/delete-menu";

export type SpaceTableRef = {
  id: number;
  name: string;
  room: number;
  table: number;
  status: "Available" | "Unavailable";
};

export const spacecolumns: ColumnDef<SpaceTableRef>[] = [
  {
    accessorKey: "name",
    header: "Space Name",
  },
  {
    accessorKey: "room",
    header: "Rooms",
  },
  {
    accessorKey: "table",
    header: "Tables",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as SpaceTableRef["status"];
      const statusClass =
        status === "Available" ? "text-green-600" : "text-red-600";
      return <span className={statusClass}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditMenuItems />
        <DeleteMenuItems />
      </div>
    ),
  },
];
