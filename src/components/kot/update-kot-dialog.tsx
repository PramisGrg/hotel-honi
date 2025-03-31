import { Minus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TKotItems } from "@/types/order.types";
import { useState } from "react";
import { Button } from "../ui/button";
import { useUpdateKot } from "@/queries/order-and-kot/update-kot";

interface UpdatKotDialogProps {
  orderId: string | undefined;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  kotItems: TKotItems | undefined;
  setKotItems: (items: TKotItems) => void;
}

const UpdateKotDialog = ({
  orderId,
  isDialogOpen,
  setIsDialogOpen,
  kotItems,
  setKotItems,
}: UpdatKotDialogProps) => {
  const [selectStatus, setSelectStatus] = useState("");

  const updateKot = useUpdateKot();

  const handleIncrease = () => {
    if (kotItems) {
      setKotItems({ ...kotItems, quantity: kotItems.quantity + 1 });
    }
  };

  const handleDecrease = () => {
    if (kotItems && kotItems.quantity > 1) {
      setKotItems({ ...kotItems, quantity: kotItems.quantity - 1 });
    }
  };

  const handleClick = () => {
    updateKot.mutate({
      orderId,
      kotId: kotItems?.kotId,
      kotItemId: kotItems?.id,
      quantity: kotItems?.quantity,
      status: selectStatus,
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Update Kot :</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <h1>{kotItems?.item.name}</h1>
          <button className="flex border w-full px-2 rounded-md py-1 justify-between">
            <span className="px-2 py-1" onClick={() => handleDecrease()}>
              <Minus className="w-5 h-5" />
            </span>
            <p>{kotItems?.quantity}</p>
            <span className="px-2 py-1" onClick={() => handleIncrease()}>
              <Plus className="w-5 h-5" />
            </span>
          </button>
        </div>
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
        <Button onClick={handleClick}>Update Kot</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateKotDialog;
