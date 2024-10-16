import { inventorycolumns } from "@/components/columns/inventory-column";
import { InventoryTable } from "@/components/table/inventory-table";
import { useGetInventory } from "@/queries/table/inventory-table/get-inventory";
import { useEffect, useState } from "react";

const Inventory = () => {
  const [allInventory, setAllInventory] = useState([]);

  const { data: inventory } = useGetInventory();

  useEffect(() => {
    if (inventory) {
      setAllInventory(inventory.data);
    }
  }, [inventory]);

  return (
    <div className="flex">
      <div className="w-full p-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Inventory</h1>
          <p className="text-sm text-gray-600">
            View and manage all your inventory
          </p>
        </div>
        <InventoryTable columns={inventorycolumns} data={allInventory} />
      </div>
    </div>
  );
};

export default Inventory;
