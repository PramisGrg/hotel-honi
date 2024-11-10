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
import { StaffTableCloumnRef } from "../columns/staff-columns";
import { Input } from "../ui/input";
import { useDebounceValue } from "@/store/debounce-store";
import InviteStaff from "../popup-table/staff-table/invite-staff";

interface DataTableProps<TData extends StaffTableCloumnRef, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StaffTable<TData extends StaffTableCloumnRef, TValue>({
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

  const { setDebounceSpaceValue } = useDebounceValue((state) => ({
    setDebounceSpaceValue: state.setDebounceSpaceValue,
  }));

  const { setSelectStaffId } = useTableIdStore((state) => ({
    setSelectStaffId: state.setSelectStaffId,
  }));

  const handleClick = (row: Row<StaffTableCloumnRef>) => {
    setSelectStaffId(row.original.id);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceSpaceValue(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="py-2">
          <InviteStaff />
        </div>
        <div className="w-96 py-2">
          <Input
            onChange={handleSearchChange}
            placeholder="Filter Staff..."
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
