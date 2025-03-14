import { useEffect, useState } from "react";
import { tablecolumns } from "@/components/columns/table-columns";
import { TableTable } from "@/components/table/table-table";
import { useGetTableQuery } from "@/queries/table/table-table/get.table.query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";
import AppLayout from "@/layout/dashboard-layout";

const Table = () => {
  const { debounceTableValue } = useDebounceValue((state) => ({
    debounceTableValue: state.debounceTableValue,
  }));

  const debounceSearchTable = useDebounce(debounceTableValue, 750);

  const [allTables, setAllTables] = useState([]);

  const { data: tables } = useGetTableQuery({ search: debounceSearchTable });

  useEffect(() => {
    if (tables) {
      setAllTables(tables.data);
    }
  }, [tables]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Tables</h1>
        <p className="text-neutral-400">View and manage all your tables</p>
      </div>
      <TableTable columns={tablecolumns} data={allTables} />
    </AppLayout>
  );
};

export default Table;
