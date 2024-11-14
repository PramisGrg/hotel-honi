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
import { useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUpdateKot } from "@/queries/order-and-kot/update-kot";

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
  const [kotItems, setKotItems] = useState<KotItem>();
  const [selectStatus, setSelectStatus] = useState("");

  const { orderId } = useParams();
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

          <div className="grid grid-cols-4 gap-4">
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

          {/*Dailog */}
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
        </div>
      </div>
    </div>
  );
};

export default KotUpdate;
