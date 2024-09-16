import Sidebar from "@/components/common/Sidebar";
import { CustomerTable } from "@/components/table/customer-table";
import { SupplierTable } from "@/components/table/supplier-table";
import { useDebounce } from "@/hooks/debounce";
import { customercolumns } from "@/components/columns/customer-columns";
import { suppliercolumns } from "@/components/columns/supplier-columns";
import { UseGetCustomerQuery } from "@/queries/table/customer-table/get-cutomer-query";
import { useDebounceValue } from "@/store/debounce-store";
import { useEffect, useState } from "react";
import { UseGetSupplierQuery } from "@/queries/table/supplier-table/get-supplier-query";

const Customer = () => {
  const [toggle, setToggle] = useState("customer");
  const [allCustomer, setAllCustomer] = useState([]);
  const [allSupplier, setAllSupplier] = useState([]);

  const { debounceCustomerValue, debounceSupplierValue } = useDebounceValue(
    (state) => ({
      debounceCustomerValue: state.debounceCustomerValue,
      debounceSupplierValue: state.debounceSupplierValue,
    })
  );

  const debounceSearchCustomer = useDebounce(debounceCustomerValue, 750);
  const debounceSearchSupplier = useDebounce(debounceSupplierValue, 750);

  const { data: customers } = UseGetCustomerQuery({
    search: debounceSearchCustomer,
  });
  const { data: supplier } = UseGetSupplierQuery({
    search: debounceSearchSupplier,
  });

  useEffect(() => {
    if (customers) {
      setAllCustomer(customers.data);
    }
  }, [customers]);

  useEffect(() => {
    if (supplier) {
      setAllSupplier(supplier.data);
    }
  }, [supplier]);

  return (
    <div className="flex">
      <div className="z-40">
        <Sidebar />
      </div>
      <div className="w-full  p-8">
        {/* Room and Spaces */}

        <div className="">
          <h1 className="text-xl">Customer</h1>
          <p className="text-sm text-gray-600">
            View and manage all your rooms, spaces & tables
          </p>
        </div>

        {/* Button */}
        <div className="py-8 flex gap-20">
          <button
            onClick={() => setToggle("customer")}
            className={`${
              toggle === "customer" ? "bg-blue-600 text-white" : "bg-white"
            } p-2 rounded-md px-4`}
          >
            Customer
          </button>
          <button
            onClick={() => setToggle("supplier")}
            className={`${
              toggle === "supplier" ? "bg-blue-600 text-white" : "bg-white"
            } p-2 rounded-md px-4`}
          >
            Supplier
          </button>
        </div>

        {/* Conditional Rendering */}
        {toggle === "customer" && (
          <CustomerTable columns={customercolumns} data={allCustomer} />
        )}
        {toggle === "supplier" && (
          <SupplierTable columns={suppliercolumns} data={allSupplier} />
        )}
      </div>
    </div>
  );
};

export default Customer;
