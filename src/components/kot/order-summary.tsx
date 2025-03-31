import { useGetKot } from "@/queries/order-and-kot/get.all.kot";
import React from "react";
import { Button } from "../ui/button";

const OrderSummary = ({ orderId }: { orderId: string }) => {
  const { data: kot } = useGetKot(orderId);
  const kotData = kot?.data || [];

  const totalPrice = kotData.reduce((total, kot) => {
    const kotTotal = kot.KotItems.reduce(
      (acc, item) => acc + item.quantity * item.item.price,
      0
    );
    return total + kotTotal;
  }, 0);

  return (
    <div className="rounded-md border h-[85vh] py-6">
      <h1 className="text-center">Order Summary</h1>
      <div className="p-4 flex flex-col h-full justify-between rounded-md">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left min-w-[100px]">Item</th>
              <th className="px-4 py-2 text-center min-w-[60px]">Qty</th>
              <th className="px-4 py-2 text-right min-w-[80px]">Price</th>
              <th className="px-4 py-2 text-center min-w-[70px]">KOT</th>
            </tr>
          </thead>
          <tbody>
            {kotData.map((kot, index) => (
              <React.Fragment key={index}>
                {kot.KotItems.map((kotSolo, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 last:border-none"
                  >
                    <td className="px-4 py-2">{kotSolo.item.name}</td>
                    <td className="px-4 py-2 text-center">
                      {kotSolo.quantity}
                    </td>
                    <td className="px-4 py-2 text-right">
                      Rs {kotSolo.item.price}
                    </td>
                    {idx === 0 && (
                      <td
                        rowSpan={kot.KotItems.length}
                        className="px-4 py-2 text-center align-middle font-semibold"
                      >
                        #{kot.kotNumber}
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <section className="space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span>{totalPrice}</span>
          </div>

          <Button
            // onClick={() => {
            //   setShowCheckoutSheet(true);
            // }}
            className="w-full"
          >
            Checkout
          </Button>
        </section>
      </div>
    </div>
  );
};

export default OrderSummary;
