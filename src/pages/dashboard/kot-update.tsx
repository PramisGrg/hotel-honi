import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetKot } from "@/queries/order-and-kot/get-all-kot";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUpdateKot } from "@/queries/order-and-kot/update-kot";
import { Checkout } from "@/components/kot/checkout";

interface KotItem {
  id?: string;
  kotId: string;
  quantity: number;
  status: string;
  item: {
    id: string;
    name: string;
    price: number;
  };
}

const KotUpdate = () => {
  const [popup, setPopup] = useState(false);
  const [showCheckoutSheet, setShowCheckoutSheet] = useState(false);
  const [kotItems, setKotItems] = useState<KotItem>();
  const [selectStatus, setSelectStatus] = useState("");

  const { orderId, status } = useParams();
  const { data: kot } = useGetKot(orderId);
  const updateKot = useUpdateKot();

  const kotData = kot?.data || [];

  const handleClick = () => {
    updateKot.mutate({
      orderId,
      kotId: kotItems?.kotId,
      kotItemId: kotItems?.id,
      quantity: kotItems?.quantity,
      status: selectStatus,
    });
    setPopup(false);
  };

  const handleIncrease = () => {
    setKotItems((prev) =>
      prev ? { ...prev, quantity: prev.quantity + 1 } : prev
    );
  };

  const handleDecrease = () => {
    setKotItems((prev) =>
      prev && prev.quantity > 1
        ? { ...prev, quantity: prev.quantity - 1 }
        : prev
    );
  };

  const url = window.location.href;
  const checkUrl = url.includes("kot-update");
  console.log(kotData, "This is KOt Data");

  const totalPrice = kotData.reduce((total, kot) => {
    const kotTotal = kot.KotItems.reduce(
      (acc, item) => acc + item.quantity * item.item.price,
      0
    );
    return total + kotTotal;
  }, 0);

  return (
    <div>
      <div className="flex">
        <div className="w-full p-8 space-y-6">
          <div>
            <h1 className="text-xl font-semibold"> Update Kot</h1>
            <p className="text-sm text-gray-600">
              View and manage all your Kots
            </p>
          </div>

          <div className="space-x-6">
            <Link to={`/dashboard/kot/${orderId}/${status}`}>
              <button
                className={`${
                  checkUrl ? "bg-none text-black" : "bg-blue-500 text-white"
                }  p-2 rounded-md`}
              >
                Kot Details
              </button>
            </Link>
            <Link to={`/dashboard/kot-update/${orderId}`}>
              <button
                className={`${
                  checkUrl ? "bg-blue-500 text-white" : "bg-none text-black"
                }  p-2 rounded-md`}
              >
                Update Kot
              </button>
            </Link>
          </div>

          <div className="flex space-x-4">
            <div className="w-2/3">
              <div className="grid grid-cols-3 gap-4">
                {kotData.map((kot) => (
                  <Card key={kot.kotNumber}>
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
                              onClick={() => {
                                setPopup(true);
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/*Order Summary*/}
            <div className="w-1/3 h-[75vh] rounded-md border">
              <h1 className="text-center pt-4 font-mono">Order Summary</h1>
              <div className="p-4 flex flex-col h-[550px] justify-between rounded-md">
                <table className="w-full text-sm text-gray-700 border-collapse">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-4 py-2 font-normal">Item</th>
                      <th className="px-4 py-2 font-normal">Qty</th>
                      <th className="px-4 py-2 font-normal">Price</th>
                      <th className="px-4 py-2 font-normal">KOT</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {kotData.map((kot, index) => (
                      <React.Fragment key={index}>
                        {kot.KotItems.map((kotSolo, idx) => (
                          <tr key={idx} className="last:border-none">
                            <td className="px-4 py-2">{kotSolo.item.name}</td>
                            <td className="px-4 py-2">{kotSolo.quantity}</td>
                            <td className="px-4 py-2">
                              Rs {kotSolo.item.price}
                            </td>
                            {idx === 0 && (
                              <td
                                rowSpan={kot.KotItems.length}
                                className="px-4 py-2 text-center align-middle"
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
                <div className="">
                  <div className="flex justify-between py-4">
                    <span>Total</span>
                    <span>{totalPrice}</span>
                  </div>
                  <Button
                    disabled={!(status === "SERVED")}
                    onClick={() => {
                      setShowCheckoutSheet(true);
                    }}
                    className="w-full"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/*Dailog for KOT*/}
          <Dialog open={popup} onOpenChange={setPopup}>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle className="font-normal">Update Kot :</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>{kotItems?.item.name}</div>
                <div>
                  <button className="flex border w-full px-2 rounded-md py-1 justify-between">
                    <span
                      className="px-2 py-1"
                      onClick={() => handleDecrease()}
                    >
                      <Minus className="w-5 h-5 pt-1" />
                    </span>
                    <p>{kotItems?.quantity}</p>
                    <span
                      className="px-2 py-1"
                      onClick={() => handleIncrease()}
                    >
                      <Plus className="w-5 h-5 pt-1" />
                    </span>
                  </button>
                </div>
                <div>
                  <Select onValueChange={(value) => setSelectStatus(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="SERVED">Served</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-row-reverse">
                <Button onClick={handleClick}>Update Kot</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/*Sheet for Checkout*/}
          <Checkout
            kotData={kotData}
            orderId={orderId ?? ""}
            totalAmount={totalPrice}
            showCheckoutSheet={showCheckoutSheet}
            setShowCheckoutSheet={setShowCheckoutSheet}
          />
        </div>
      </div>
    </div>
  );
};

export default KotUpdate;
