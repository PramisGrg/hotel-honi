import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useAddPaymentMethod } from "@/queries/payment/add-payment";

const AddPayment = () => {
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createPayment = useAddPaymentMethod();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentMethod = {
      name,
      remarks,
    };

    createPayment.mutate(paymentMethod, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add payment
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add payment emthod</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide payment method to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Payment Method</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                value={remarks}
                id="remarks"
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                className="bg-blue-600 duration-500 hover:text-gray-300"
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayment;
