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
import { UseDeleteRoomQuery } from "@/queries/table/room-table/delete-room-query";
import { useTableIdStore } from "@/store/table-id-store";
import { MdOutlineDelete } from "react-icons/md";

export function DeleteRoom() {
  const { selectRoomId } = useTableIdStore((state) => ({
    selectRoomId: state.selectRoomId,
  }));

  const deleteRoom = UseDeleteRoomQuery();

  const handleDelete = () => {
    if (selectRoomId) {
      deleteRoom.mutate(selectRoomId);
    }
    console.log("Elete");
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
            rooms from our servers.
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
