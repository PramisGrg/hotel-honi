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
import { useDeletePaymentMethod } from "@/queries/payment/delete-payment";
import { MdOutlineDelete } from "react-icons/md";

export function DeletePaymentMethod({ paymentId }: { paymentId: string }) {
  const deletePayment = useDeletePaymentMethod();

  const handleDelete = () => {
    if (!paymentId) return;
    deletePayment.mutate(paymentId);
    console.log(paymentId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex">
        <MdOutlineDelete className="w-5 h-5 text-red-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            payment method from our servers.
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
