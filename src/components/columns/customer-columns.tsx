import { ColumnDef } from "@tanstack/react-table";
import { DeleteCustomer } from "../popup-table/customer-table/delete-customer";
import { EditCustomer } from "../popup-table/customer-table/edit-customer";

export type CustomerColumnRef = {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  balance: number;
};

export const customercolumns: ColumnDef<CustomerColumnRef>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
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
        <EditCustomer />
        <DeleteCustomer />
      </div>
    ),
  },
];
