import AddOrder from "@/components/popup-table/order-table/add-order";
import { Input } from "@/components/ui/input";
import { useGetOrder } from "@/queries/order-and-kot/get-all-order";

const Order = () => {
  const { data: order } = useGetOrder();
  console.log(order, "This is all Order");

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div className="">
          <h1 className="text-xl">Order</h1>
          <p className="text-sm text-gray-60 pb-4">
            View and manage all your staffs
          </p>
          <div className="flex justify-between">
            <AddOrder />
            <Input className="w-1/3 rounded-md" placeholder="Search Order..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
