import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteInventory } from "@/queries/table/inventory-table/delete-inventory-query";
import { useTableIdStore } from "@/store/table-id-store";
import { MdOutlineDelete } from "react-icons/md";

export function DeleteInventory() {
  const { selectInventoryId } = useTableIdStore((state) => ({
    selectInventoryId: state.selectInventoryId,
  }));

  const deleteInventory = useDeleteInventory();

  const handleDelete = () => {
    if (selectInventoryId) {
      deleteInventory.mutate(selectInventoryId);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MdOutlineDelete className="w-6 h-6 text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete customer
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-400">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
