import { useGetTableQuery } from "@/queries/table/table-table/get.table.query";
import { useState } from "react";
import ConfirmOrder from "./confirm-order";
import { useTableRoomStore } from "@/store/table.and.room.store";
import { TTableResponseData } from "@/types/order.types";

export const RenderTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: table } = useGetTableQuery({ search: "" });
  const tablesData = table?.data || [];

  const { setTable } = useTableRoomStore();

  const handleTableClick = (table: TTableResponseData) => {
    setIsDialogOpen(true);
    setTable(table);
  };

  return (
    <div>
      <section className="grid grid-cols-3 gap-4">
        {tablesData.map((table) => (
          <div
            className="border p-3 flex justify-between rounded-md hover:scale-105 transition-all duration-300 cursor-pointer"
            key={table.id}
            onClick={() => handleTableClick(table)}
          >
            <h1 className="text-sm items-center flex">{table.name}</h1>
            <div className="lowercase text-xs bg-green-100 p-2 rounded-md">
              <p className="text-green-700">{table.status}</p>
            </div>
          </div>
        ))}
      </section>

      <ConfirmOrder
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};
