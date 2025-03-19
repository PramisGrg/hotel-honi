import { CustomerTable } from "@/components/table/customer-table";
import { useDebounce } from "@/hooks/debounce";
import { customercolumns } from "@/components/columns/customer-columns";
import { useGetCustomerQuery } from "@/queries/table/customer-table/get.cutomer.query";
import { useDebounceValue } from "@/store/debounce-store";
import { useEffect, useState } from "react";
import { CustomerType } from "@/queries/table/customer-table/get.cutomer.query";
import AppLayout from "@/layout/dashboard-layout";

const Customer = () => {
  const [allCustomer, setAllCustomer] = useState<CustomerType[]>([]);

  const { debounceCustomerValue } = useDebounceValue((state) => ({
    debounceCustomerValue: state.debounceCustomerValue,
  }));

  const debounceSearchCustomer = useDebounce(debounceCustomerValue, 750);

  const { data: customers } = useGetCustomerQuery({
    search: debounceSearchCustomer,
  });

  useEffect(() => {
    if (customers) {
      setAllCustomer(customers?.data);
    }
  }, [customers]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Customer</h1>
        <p className="text-neutral-400">View and manage all your customers</p>
      </div>
      <CustomerTable columns={customercolumns} data={allCustomer} />
    </AppLayout>
  );
};

export default Customer;
