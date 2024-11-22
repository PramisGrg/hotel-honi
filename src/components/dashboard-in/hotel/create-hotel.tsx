import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
  const [primaryContact, setPrimaryContact] = useState("");
  const [open, setOpen] = useState(false);

  const createHotelMutation = useCreateHotel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: hotelName,
      address,
      primaryContact,
    };

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
        <span>Create hotel</span>
      </DialogTrigger>
      <DialogContent className="max-w-[550px] space-y-2">
        <DialogHeader>
          <DialogTitle>Create Hotel</DialogTitle>
          <DialogDescription>
            Please provide some information to create new hotel
          </DialogDescription>
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
            <div>
              <Label htmlFor="primaryContact" className="text-right">
                Primary Contact
              </Label>
              <Input
                placeholder="9866060075"
                value={primaryContact}
                onChange={(e) => setPrimaryContact(e.target.value)}
                id="primaryContact"
              />
            </div>
          </div>
          <DialogFooter className="pt-6">
            <Button
              className="bg-blue-500 hover:text-gray-200 hover:shadow-md duration-300"
              type="submit"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
