import AddOrder from "@/components/popup-table/order-table/add-order";
import { Input } from "@/components/ui/input";
import { useGetOrder } from "@/queries/order-and-kot/get-all-order";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

const Order = () => {
  const { data: order } = useGetOrder();
  const orders = order?.data || [];
  console.log(orders, "This si orders");

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
          <div className="grid grid-cols-4 gap-4 py-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                className="border rounded-md p-2 text-sm"
                to={`/dashboard/kot/${order.id}`}
              >
                <div>
                  <div className="flex justify-between">
                    <p>{order?.table?.name}</p>
                    <p
                      className={`lowercase ${
                        order.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                  <p className="text-gray-400 py-2">
                    Order number :
                    <span className="text-base pl-2">{order.orderNumber}</span>
                  </p>
                  <div>
                    {order.kots.map((kots) => (
                      <div key={kots.id} className="p-0 m-0">
                        {kots.KotItems.map((kotItems) => (
                          <span key={kotItems.id}>
                            <span className="flex">
                              <Dot className="text-green-400 pb-1" />
                              {kotItems.item.name}
                            </span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
