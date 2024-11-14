import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface KotItem {
  id?: string;
  quantity: number;
  status: string;
  item: {
    id: string;
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

interface UpdateKotProps {
  popup: boolean;
  setPopup: (value: boolean) => void;
  kotData?: Kot;
}

const UpdateKot: React.FC<UpdateKotProps> = ({ popup, setPopup, kotData }) => {
  const [kotItems, setKotItems] = useState<KotItem[]>(kotData?.KotItems || []);

  useEffect(() => {
    setKotItems(kotData?.KotItems || []);
  }, [kotData?.KotItems]);

  const handleIncrease = (index: number) => {
    setKotItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: updatedItems[index].quantity + 1,
      };
      return updatedItems;
    });
  };

  const handleDecrease = (index: number) => {
    setKotItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].quantity > 1) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };
      }
      return updatedItems;
    });
  };

  return (
    <div>
      <Dialog open={popup} onOpenChange={setPopup}>
        <DialogContent className="min-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="font-normal">
              Update Kot : {kotData?.kotNumber}
            </DialogTitle>
          </DialogHeader>
          <div className="min-h-[70vh]">
            <div className="grid grid-cols-3 gap-4 ">
              {kotItems.map((kotItem, index) => (
                <div
                  className="border p-2 rounded-md"
                  key={kotItem.id || `kot-item-${index}`}
                >
                  <p>{kotItem.status}</p>
                  <p>{kotItem.item.name}</p>
                  <div>
                    <button className="flex bg-red-200 w-full px-2 rounded-md py-1 justify-between">
                      <span
                        className="px-2 py-1"
                        onClick={() => handleDecrease(index)}
                      >
                        <Minus className="w-5 h-5 pt-1" />
                      </span>
                      <p>{kotItem.quantity}</p>
                      <span
                        className="px-2 py-1"
                        onClick={() => handleIncrease(index)}
                      >
                        <Plus className="w-5 h-5 pt-1" />
                      </span>
                    </button>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Served">Served</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <Button>Update Kot</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateKot;
