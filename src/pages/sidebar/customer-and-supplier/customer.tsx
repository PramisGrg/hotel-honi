import { CustomerTable } from "@/components/table/customer-table";
import { useDebounce } from "@/hooks/debounce";
import { customercolumns } from "@/components/columns/customer-columns";
import { UseGetCustomerQuery } from "@/queries/table/customer-table/get-cutomer-query";
import { useDebounceValue } from "@/store/debounce-store";
import { useEffect, useState } from "react";
import { CustomerType } from "@/queries/table/customer-table/get-cutomer-query";

const Customer = () => {
  const [allCustomer, setAllCustomer] = useState<CustomerType[]>([]);

  const { debounceCustomerValue } = useDebounceValue((state) => ({
    debounceCustomerValue: state.debounceCustomerValue,
  }));

  const debounceSearchCustomer = useDebounce(debounceCustomerValue, 750);

  const { data: customers } = UseGetCustomerQuery({
    search: debounceSearchCustomer,
  });

  useEffect(() => {
    if (customers) {
      setAllCustomer(customers?.data);
    }
  }, [customers]);

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div>
          <h1 className="text-xl">Customer</h1>
          <p className="text-sm text-gray-600">
            View and manage all your Customers
          </p>
        </div>

        <CustomerTable columns={customercolumns} data={allCustomer} />
      </div>
    </div>
  );
};

export default Customer;
