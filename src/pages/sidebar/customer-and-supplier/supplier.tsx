import { SupplierTable } from "@/components/table/supplier-table";
import { useDebounce } from "@/hooks/debounce";
import { suppliercolumns } from "@/components/columns/supplier-columns";
import { useDebounceValue } from "@/store/debounce-store";
import { useEffect, useState } from "react";
import { UseGetSupplierQuery } from "@/queries/table/supplier-table/get-supplier-query";

const Supplier = () => {
  const [allSupplier, setAllSupplier] = useState([]);

  const { debounceSupplierValue } = useDebounceValue((state) => ({
    debounceSupplierValue: state.debounceSupplierValue,
  }));

  const debounceSearchSupplier = useDebounce(debounceSupplierValue, 750);

  const { data: supplier } = UseGetSupplierQuery({
    search: debounceSearchSupplier,
  });

  useEffect(() => {
    if (supplier) {
      setAllSupplier(supplier.data);
    }
  }, [supplier]);

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div>
          <h1 className="text-xl">Suppliers</h1>
          <p className="text-sm text-gray-600">
            View and manage all your Suppliers
          </p>
        </div>
        <SupplierTable columns={suppliercolumns} data={allSupplier} />
      </div>
    </div>
  );
};

export default Supplier;
