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
import { UseAddTableQuery } from "@/queries/table/table-table/add-table-query";

const AddTable = () => {
  const [name, setName] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createTable = UseAddTableQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const table = {
      name,
      capacity,
    };
    createTable.mutate(table, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
      },
    });
    console.log("Pramis");
    console.log(table);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add Table
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Table</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide table name to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Table Name</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                value={capacity}
                id="name"
                type="number"
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

export default AddTable;
