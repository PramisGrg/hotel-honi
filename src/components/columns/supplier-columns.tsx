import { ColumnDef } from "@tanstack/react-table";
import { DeleteSupplier } from "../popup-table/supplier-table/delete-supplier";
import { EditSupplier } from "../popup-table/supplier-table/edit-supplier";

export type SupplierColumnRef = {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  balance: number;
};

export const suppliercolumns: ColumnDef<SupplierColumnRef>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditSupplier />
        <DeleteSupplier />
      </div>
    ),
  },
];
