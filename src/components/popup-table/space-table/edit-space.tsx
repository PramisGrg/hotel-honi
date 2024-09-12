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
import { UseEditSpaceQuery } from "@/queries/table/space-table/edit-space-query";
import { useTableIdStore } from "@/store/table-id-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";

export interface DataTypeSpace {
  name: string;
}

export function EditSpace() {
  const [name, setName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectSpaceId } = useTableIdStore((state) => ({
    selectSpaceId: state.selectSpaceId,
  }));

  const editSpace = UseEditSpaceQuery();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectSpaceId) {
      toast.error("No menu item selected for editing");
      return;
    }
    const data: DataTypeSpace = {
      name,
    };

    editSpace.mutate(
      { id: selectSpaceId, data },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
        onError: () => {
          setName("");
        },
      }
    );
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setIsDialogOpen(true)}>
          <MdOutlineEdit className="text-green-700 w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Space</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your Space here 🤪
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:text-gray-200 duration-300 hover:shadow-md"
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
