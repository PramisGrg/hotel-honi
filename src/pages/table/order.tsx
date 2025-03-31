import AddOrder from "@/components/popup-table/order-table/add-order";
import { useGetOrder } from "@/queries/order-and-kot/get.all.order";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";
import NoOrder from "@/components/order/no-order";
import AppLayout from "@/layout/dashboard-layout";

const Order = () => {
  const { data: order } = useGetOrder();
  const orderData = order?.data || [];

  return (
    <AppLayout className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Order</h1>
        <p className="text-neutral-400">View and manage all your orders</p>
      </div>

      {orderData.length > 0 ? (
        <div>
          <AddOrder />
          <div className="grid grid-cols-4 gap-4 py-6">
            {orderData.map((order) => (
              <Link
                key={order.id}
                className="border rounded-md p-2 text-sm cursor-pointer hover:scale-105 transition-all duration-300"
                to={`/dashboard/kot/${order.id}/${order.status}`}
              >
                <div className="flex justify-between">
                  <h1>{order?.table?.name}</h1>
                  <h3
                    className={`lowercase ${
                      order.status === "PENDING"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </h3>
                </div>
                <p className="text-gray-400 py-2">
                  Order number :
                  <span className="text-base pl-2">{order.orderNumber}</span>
                </p>

                {order.kots.map((kots) => (
                  <div key={kots.id}>
                    {kots.KotItems.map((kotItems) => (
                      <div key={kotItems.id}>
                        <span className="flex">
                          <Dot className="text-green-400 pb-1" />
                          {kotItems.item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <NoOrder />
      )}
    </AppLayout>
  );
};

export default Order;
