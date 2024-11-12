import { useEffect, useState } from "react";
import { tablecolumns } from "@/components/columns/table-columns";
import { TableTable } from "@/components/table/table-table";
import { useGetTableQuery } from "@/queries/table/table-table/get-table-query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";

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
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div>
          <h1 className="text-xl">Tables</h1>
          <p className="text-sm text-gray-600">
            View and manage all your tables
          </p>
        </div>

        <TableTable columns={tablecolumns} data={allTables} />
      </div>
    </div>
  );
};

export default Table;
