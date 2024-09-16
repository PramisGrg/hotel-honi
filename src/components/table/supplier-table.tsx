import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableIdStore } from "@/store/table-id-store";
import { SupplierColumnRef } from "../columns/supplier-columns";
import { Input } from "../ui/input";
import { useDebounceValue } from "@/store/debounce-store";
import AddSupplier from "../popup-table/supplier-table/add-supplier";

interface DataTableProps<TData extends SupplierColumnRef, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function SupplierTable<TData extends SupplierColumnRef, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const { setDebounceSupplierValue } = useDebounceValue((state) => ({
    setDebounceSupplierValue: state.setDebounceSupplierValue,
  }));

  const { setSelectSupplierId } = useTableIdStore((state) => ({
    setSelectSupplierId: state.setSelectSupplierId,
  }));

  const handleClick = (row: Row<SupplierColumnRef>) => {
    setSelectSupplierId(row.original.id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceSupplierValue(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="py-2">
          <AddSupplier />
        </div>
        <div className="w-96 py-2">
          <Input
            onChange={handleSearchChange}
            placeholder="Filter suppliers..."
            className="max-w-sm"
          />
        </div>
      </div>
      <div>
        <Table className="rounded-md border">
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
                  onClick={() => handleClick(row)}
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
  );
}
