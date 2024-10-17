import { ColumnDef } from "@tanstack/react-table";
import { DeleteInventory } from "../popup-table/inventory-table/delete-inventory";
import EditInventory from "../popup-table/inventory-table/edit-inventory";

export type InventoryCloumnRef = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  description: string;
  unit: string;
};

export const inventorycolumns: ColumnDef<InventoryCloumnRef>[] = [
  {
    accessorKey: "name",
    header: " Inventory Name",
  },
  {
    accessorKey: "image",
    header: "Image,",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.name}
        className="h-12 w-12 rounded-lg object-cover"
      ></img>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditInventory />
        <DeleteInventory />
      </div>
    ),
  },
];
