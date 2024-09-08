import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateHotel } from "@/queries/hotel/create-hotel-query";

interface CreateHotelProps {
  onHotelCreated: () => void;
}

export function CreateHotel({ onHotelCreated }: CreateHotelProps) {
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);

  const createHotelMutation = useCreateHotel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: hotelName,
      address,
    };
    console.log(data);
    try {
      await createHotelMutation.mutateAsync(data);
      setHotelName("");
      setAddress("");
      setOpen(false);
      onHotelCreated();
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="">Create hotel</button>
      </DialogTrigger>
      <DialogContent className="max-w-[550px] space-y-2">
        <DialogHeader>
          <DialogTitle>Create Hotel</DialogTitle>
          <p className="text-sm text-gray-500">
            Please provide some information to create new hotel
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div>
              <Label htmlFor="hotelname" className="text-right">
                Hotel Name
              </Label>
              <Input
                id="hotelname"
                value={hotelName}
                placeholder="Perfect Hotel Pvt Ltd"
                onChange={(e) => setHotelName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                placeholder="Syangja, Nepal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Hotel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
