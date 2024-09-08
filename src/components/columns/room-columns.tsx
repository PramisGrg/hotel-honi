import { ColumnDef } from "@tanstack/react-table";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export type RoomTableRef = {
  id: number;
  room: string;
  totalCapacity: number;
  space: string;
  status: "Available" | "Unavailable";
};

export const roomcolumns: ColumnDef<RoomTableRef>[] = [
  {
    accessorKey: "room",
    header: "Room Number",
  },
  {
    accessorKey: "totalCapacity",
    header: "Total Capacity",
  },
  {
    accessorKey: "space",
    header: "Space",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as RoomTableRef["status"];
      const statusClass =
        status === "Available" ? "text-green-600" : "text-red-600";
      return <span className={statusClass}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          onClick={() => console.log(row.original.room)}
          className="text-green-600 hover:underline"
        >
          <MdOutlineModeEdit className="h-6 w-6" />
        </button>
        <button className="text-red-600 hover:underline">
          <MdDeleteOutline className="h-6 w-6" />
        </button>
      </div>
    ),
  },
];
