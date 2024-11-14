import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetKot } from "@/queries/order-and-kot/get-all-kot";
import { Link, useParams } from "react-router-dom";
// import { useState } from "react";
// import UpdateKot from "@/components/kot/update-kot";

interface KotItem {
  id?: string;
  quantity: number;
  status: string;
  item: {
    name: string;
    price: number;
  };
}

interface Kot {
  id: string;
  kotNumber: number;
  status: string;
  KotItems: KotItem[];
}

const Kot = () => {
  const { orderId } = useParams();
  const { data: kot } = useGetKot(orderId);
  // const [popup, setPopup] = useState(false);
  // const [kotData, setKotData] = useState<Kot>();

  const kots = kot?.data || [];

  const calculateTotals = (kotItems: KotItem[]) => {
    return kotItems.reduce(
      (acc, item) => ({
        totalQuantity: acc.totalQuantity + item.quantity,
        totalPrice: acc.totalPrice + item.quantity * item.item.price,
      }),
      { totalQuantity: 0, totalPrice: 0 }
    );
  };

  // const handleClick = (kotData: Kot) => {
  //   setPopup(true);
  //   setKotData(kotData);
  // };

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Kot</h1>
          <p className="text-sm text-gray-600">View and manage all your Kots</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {kots.map((kot) => {
            const { totalQuantity, totalPrice } = calculateTotals(kot.KotItems);

            return (
              <Link key={kot.id} to={`/dashboard/kot-update/${orderId}`}>
                <Card
                // onClick={() => {
                //   handleClick(kot);
                // }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-center text-lg">
                      KOT #{kot.kotNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium text-gray-600 pb-2">
                        <span>Item</span>
                        <div className="space-x-10">
                          <span>Qty</span>
                          <span>Price</span>
                        </div>
                      </div>
                      <div className="space-y-2 min-h-[60px] border-b pb-3">
                        {kot.KotItems.map((kotItem) => (
                          <div
                            className="flex text-sm text-gray-500 justify-between"
                            key={kotItem.id}
                          >
                            <span className="w-1/2 truncate">
                              {kotItem.item.name}
                            </span>
                            <span className="text-center">
                              {kotItem.quantity}
                            </span>
                            <span className="text-right">
                              {(
                                kotItem.quantity * kotItem.item.price
                              ).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between pt-2 text-sm font-medium">
                        <span>Total</span>
                        <div className="space-x-10">
                          <span>{totalQuantity}</span>
                          <span>Rs {totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* <UpdateKot popup={popup} setPopup={setPopup} kotData={kotData} /> */}
      </div>
    </div>
  );
};

export default Kot;
