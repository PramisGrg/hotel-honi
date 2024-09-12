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
import { UseDeleteSpaceQuery } from "@/queries/table/space-table/delete-space-query";
import { useTableIdStore } from "@/store/table-id-store";
import { MdOutlineDelete } from "react-icons/md";

export function DeleteSpace() {
  const { selectSpaceId } = useTableIdStore((state) => ({
    selectSpaceId: state.selectSpaceId,
  }));

  const deleteSpace = UseDeleteSpaceQuery();

  const handleDelete = () => {
    if (selectSpaceId) {
      deleteSpace.mutate(selectSpaceId);
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
            This action cannot be undone. This will permanently delete your food
            Menu CAteogry from our servers.
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
