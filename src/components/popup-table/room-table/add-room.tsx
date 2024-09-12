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
import { UseAddRoomQuery } from "@/queries/table/room-table/add-room-query";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createRoom = UseAddRoomQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const room = {
      name,
      price,
      capacity,
    };

    createRoom.mutate(room, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
        setCapacity(0);
        setPrice("");
      },
    });
    console.log("Pramis");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide Room to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Room Name</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Price</Label>
              <Input
                value={price}
                id="name"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name">Capacity</Label>
              <Input
                value={capacity}
                id="name"
                onChange={(e) => setCapacity(Number(e.target.value))}
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

export default AddRoom;
