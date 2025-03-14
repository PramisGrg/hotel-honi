import { ColumnDef } from "@tanstack/react-table";
import { EditTable } from "../popup-table/table-table/edit-table";
import { DeleteTable } from "../popup-table/table-table/delete-table";
import { TGetTableResponseData } from "@/types/table.types";

export const tablecolumns: ColumnDef<TGetTableResponseData>[] = [
  {
    accessorKey: "name",
    header: "Space Name",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as TGetTableResponseData["status"];
      const statusClass =
        status === "AVAILABLE" ? "text-green-600" : "text-red-600";
      return <span className={statusClass}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (row) => {
      console.log({ row });
      return (
        <div className="flex gap-2">
          <EditTable />
          <DeleteTable />
        </div>
      );
    },
  },
];
