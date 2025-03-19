import { SupplierTable } from "@/components/table/supplier-table";
import { useDebounce } from "@/hooks/debounce";
import { suppliercolumns } from "@/components/columns/supplier-columns";
import { useDebounceValue } from "@/store/debounce-store";
import { useEffect, useState } from "react";
import { UseGetSupplierQuery } from "@/queries/table/supplier-table/get-supplier-query";
import AppLayout from "@/layout/dashboard-layout";

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
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Customer</h1>
        <p className="text-neutral-400">View and manage all your customers</p>
      </div>
      <SupplierTable columns={suppliercolumns} data={allSupplier} />
    </AppLayout>
  );
};

export default Supplier;
