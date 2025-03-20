import { ColumnDef } from "@tanstack/react-table";
import { DeleteSupplier } from "../popup-table/supplier-table/delete-supplier";
import { EditSupplier } from "../popup-table/supplier-table/edit-supplier";
import { TGetCustomerResponseData } from "@/types/table.types";

export const suppliercolumns: ColumnDef<TGetCustomerResponseData>[] = [
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
