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
import { UseDeletDishesQuery } from "@/queries/table/dishes-menu.tsx/delete-dishes-query";
import { useMenuIdStore } from "@/store/menu-id-store";
import { MdOutlineDelete } from "react-icons/md";

export function DeleteItems() {
  const { selectMenuId } = useMenuIdStore((state) => ({
    selectMenuId: state.selectMenuId,
  }));

  const deleteDish = UseDeletDishesQuery();

  const handleDelete = () => {
    console.log("Delete");
    console.log(selectMenuId);
    if (selectMenuId) {
      deleteDish.mutate(selectMenuId);
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
            Menu from our servers.
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
