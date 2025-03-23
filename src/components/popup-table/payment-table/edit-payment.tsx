import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditPaymentMEthod } from "@/queries/payment/edit.payment";
import {
  addPaymentSchema,
  TAddPaymentSchema,
} from "@/schema/table/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEdit } from "react-icons/md";

export function EditPaymentMethod({ paymentId }: { paymentId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editPaymentMethod = useEditPaymentMEthod();

  const form = useForm<TAddPaymentSchema>({
    resolver: zodResolver(addPaymentSchema),
  });

  const onSubmit = (data: TAddPaymentSchema) => {
    if (!paymentId) {
      throw new Error("PaymentId is required");
    }
    const requiredData = {
      id: paymentId,
      name: data.name,
      remarks: data.remarks,
    };
    editPaymentMethod.mutate(requiredData, {
      onSettled: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex" onClick={() => setIsDialogOpen(true)}>
          <MdOutlineEdit className="text-green-700 w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Payment method</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Payment Method
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your payment method"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Reamrks</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter your payment remarks"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Add Payment Method</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
