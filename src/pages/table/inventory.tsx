import { inventorycolumns } from "@/components/columns/inventory-column";
import { InventoryTable } from "@/components/table/inventory-table";
import AppLayout from "@/layout/dashboard-layout";
import { useGetInventory } from "@/queries/table/inventory-table/get.inventory.query";
import { TGetInventoryResponseData } from "@/types/table.types";
import { useEffect, useState } from "react";

const Inventory = () => {
  const [allInventory, setAllInventory] = useState<TGetInventoryResponseData[]>(
    []
  );

  const { data: inventory } = useGetInventory();

  useEffect(() => {
    if (inventory) {
      setAllInventory(inventory.data);
    }
  }, [inventory]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Inventory</h1>
        <p className="text-neutral-400">View and manage all your invnetory</p>
      </div>
      <InventoryTable columns={inventorycolumns} data={allInventory} />
    </AppLayout>
  );
};

export default Inventory;
