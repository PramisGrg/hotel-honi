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
import { UseAddSpaceQuery } from "@/queries/table/space-table/add-space-query";

const AddSpace = () => {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createSpace = UseAddSpaceQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const space = {
      name,
    };

    createSpace.mutate(space, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
      onError: () => {
        setName("");
      },
    });
    console.log("Pramis");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500" onClick={() => setIsDialogOpen(true)}>
          Add Space
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Space</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide Space name to add
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Space Name</Label>
              <Input
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
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

export default AddSpace;
