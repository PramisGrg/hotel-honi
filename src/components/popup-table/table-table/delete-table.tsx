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
import { UseDeleteTableQuery } from "@/queries/table/table-table/delete-table-query";
import { useTableIdStore } from "@/store/table-id-store";
import { MdOutlineDelete } from "react-icons/md";

export function DeleteTable() {
  const { selectTableId } = useTableIdStore((state) => ({
    selectTableId: state.selectTableId,
  }));

  const deleteSpace = UseDeleteTableQuery();

  const handleDelete = () => {
    if (selectTableId) {
      deleteSpace.mutate(selectTableId);
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
            This action cannot be undone. This will permanently delete your
            tables from our servers.
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
