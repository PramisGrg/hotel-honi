import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layout/dashboard-layout";
import { useGetKot } from "@/queries/order-and-kot/get.all.kot";
import { TKotItems } from "@/types/order.types";
import { Link, useParams } from "react-router-dom";

const Kot = () => {
  const { orderId } = useParams();
  const { data: kot } = useGetKot(orderId);

  const kotData = kot?.data || [];

  const calculateTotals = (kotItems: TKotItems[]) => {
    return kotItems.reduce(
      (acc, item) => ({
        totalQuantity: acc.totalQuantity + item.quantity,
        totalPrice: acc.totalPrice + item.quantity * item.item.price,
      }),
      { totalQuantity: 0, totalPrice: 0 }
    );
  };

  return (
    <AppLayout className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Kot</h1>
        <p className="text-neutral-400">View and manage all your kots</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {kotData.map((kot) => {
          const { totalQuantity, totalPrice } = calculateTotals(kot.KotItems);

          return (
            <Link key={kot.id} to={`/dashboard/kot-update/${orderId}`}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-neutral-500">
                    KOT #{kot.kotNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <p>Item</p>
                      <p>Qty</p>
                      <p>Price</p>
                    </div>
                    <div className="space-y-2 min-h-[60px] border-b pb-3">
                      {kot.KotItems.map((kotItem) => (
                        <div
                          className="flex text-sm text-gray-500 justify-between"
                          key={kotItem.id}
                        >
                          <span className="truncate">{kotItem.item.name}</span>
                          <span>{kotItem.quantity}</span>
                          <span>
                            {(
                              kotItem.quantity * kotItem.item.price
                            ).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-2 text-sm font-medium">
                      <p>Total</p>
                      <p>{totalQuantity}</p>
                      <p>Rs {totalPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Kot;
