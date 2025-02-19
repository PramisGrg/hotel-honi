import { ColumnDef } from "@tanstack/react-table";
import { DeleteRoom } from "../popup-table/room-table/delete-room";
import { EditRoom } from "../popup-table/room-table/edit-room";

export type RoomTableRef = {
  id: string;
  name: string;
  capacity: number;
  price: string;
  status: "AVAILABLE" | "UNAVAILABLE";
};

export const roomcolumns: ColumnDef<RoomTableRef>[] = [
  {
    accessorKey: "name",
    header: "Room Name",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as RoomTableRef["status"];
      const statusClass =
        status === "AVAILABLE" ? "text-green-600" : "text-red-600";
      return <span className={statusClass}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditRoom />
        <DeleteRoom />
      </div>
    ),
  },
];
