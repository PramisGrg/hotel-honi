import OrderSummary from "@/components/kot/order-summary";
import UpdateKotDialog from "@/components/kot/update-kot-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layout/dashboard-layout";
import { cn } from "@/lib/utils";
import { useGetKot } from "@/queries/order-and-kot/get.all.kot";
import { TKotItems } from "@/types/order.types";
import { useState } from "react";
import { useParams } from "react-router-dom";

const KotUpdate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [kotItems, setKotItems] = useState<TKotItems>();

  const { orderId } = useParams();
  const { data: kot } = useGetKot(orderId);

  const kotData = kot?.data || [];

  return (
    <AppLayout>
      <div className="grid grid-cols-6 gap-4">
        <section className="col-span-4 space-y-8">
          <div className="flex flex-col">
            <h1 className="text-xl text-neutral-700">Kot</h1>
            <p className="text-neutral-400">View and manage all your kots</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-h-[50px]">
            {kotData.map((kot) => (
              <Card key={kot.kotNumber}>
                <CardHeader>
                  <CardTitle className="text-center">
                    KOT #{kot.kotNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm font-medium text-gray-600 pb-2">
                    <span className="pr-8">Item</span>
                    <span>Qty</span>
                    <span>Price</span>
                  </div>
                  <div className="space-y-2 min-h-[60px] border-b pb-3">
                    {kot.KotItems.map((kotItem) => (
                      <div
                        onClick={() => {
                          setIsDialogOpen(true);
                          setKotItems(kotItem);
                        }}
                        className={cn(
                          "flex text-sm cursor-pointer p-2 rounded-md border text-gray-500 justify-between",
                          kotItem.status === "PENDING" && "bg-yellow-100",
                          kotItem.status === "SERVED" && "bg-green-100",
                          kotItem.status === "CANCELLED" && "bg-red-100"
                        )}
                        key={kotItem.id}
                      >
                        <span className="w-1/2 flex truncate">
                          {kotItem.item.name}
                        </span>
                        <span className="text-center">{kotItem.quantity}</span>
                        <span className="text-right">
                          {(
                            kotItem.quantity * kotItem.item.price
                          ).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="col-span-2">
          <OrderSummary orderId={orderId || ""} />
        </section>
      </div>

      <UpdateKotDialog
        orderId={orderId}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        kotItems={kotItems}
        setKotItems={setKotItems}
      />

      {/*       
      <Checkout
        kotData={kotData}
        orderId={orderId ?? ""}
        totalAmount={200}
        showCheckoutSheet={showCheckoutSheet}
        setShowCheckoutSheet={setShowCheckoutSheet}
      />  */}
    </AppLayout>
  );
};

export default KotUpdate;
