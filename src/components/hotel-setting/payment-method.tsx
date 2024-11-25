import { useGetPayment } from "@/queries/payment/get-payment";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import AddPayment from "../popup-table/payment-table/add-payment";
import { DeletePaymentMethod } from "../popup-table/payment-table/delete-payment";
import { EditPaymentMethod } from "../popup-table/payment-table/edit-payment";

export type PaymentMethodType = {
  id: string;
  name: string;
  remarks: string;
};

const ActionCell = ({ payment }: { payment: PaymentMethodType }) => {
  const [paymentId, setPaymentId] = React.useState("");

  return (
    <div className="flex space-x-2">
      <div>
        <button
          onClick={() => {
            setPaymentId(payment.id);
          }}
        >
          <DeletePaymentMethod paymentId={paymentId} />
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setPaymentId(payment.id);
          }}
        >
          <EditPaymentMethod paymentId={paymentId} />
        </button>
      </div>
    </div>
  );
};

const columns: ColumnDef<PaymentMethodType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("remarks")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell payment={row.original} />,
  },
];

export default function PaymentMethod() {
  const [rowSelection, setRowSelection] = React.useState({});
  const { data: payment } = useGetPayment();

  const paymentData = payment?.data || [];

  const table = useReactTable<PaymentMethodType>({
    data: paymentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between pb-4">
        <AddPayment />
        <Input className="w-1/2" placeholder="Enter payment method..." />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
