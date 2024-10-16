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
import { UseEditDishesQuery } from "@/queries/table/dishes-menu/edit-dishes-query";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "sonner";
import { useTableIdStore } from "@/store/table-id-store";

export interface DataTypeMenu {
  name: string;
  price: number | undefined;
  description: string;
  category: string;
}

export function EditMenuItems() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { selectMenuId } = useTableIdStore((state) => ({
    selectMenuId: state.selectMenuId,
  }));

  const editMenu = UseEditDishesQuery();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectMenuId) {
      toast.error("No menu item selected for editing");
      return;
    }
    const data: DataTypeMenu = {
      name,
      price,
      description,
      category: "14ded12c-7cc3-40d1-9f90-21eb74bbc4ff",
    };

    editMenu.mutate(
      { id: selectMenuId, data },
      {
        onSuccess: () => {
          console.log("Edit successful");
          setIsDialogOpen(false);
        },
        onError: () => {
          setName("");
          setDescription("");
          setPrice(undefined);
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
          <DialogTitle>Edit Menu Items</DialogTitle>
          <DialogDescription className="text-gray-400">
            Edit your menu items here
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Price
              </Label>
              <Input
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                id="username"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="username"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Category
              </Label>
              <Input id="username" className="col-span-3" />
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
