import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBill } from "@/queries/bill/get.bill.query";
import {
  addBillDataSchema,
  TAddBillDataSchema,
} from "@/schema/info/add.billing.info";
import AppLayout from "@/layout/dashboard-layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBill } from "@/queries/bill/update.bill.query";

const BillingInfo = () => {
  const form = useForm<TAddBillDataSchema>({
    resolver: zodResolver(addBillDataSchema),
    defaultValues: {
      taxRate: 0,
      serviceCharge: 0,
      serviceChargeType: "",
    },
  });

  const { data: bill } = useGetBill();
  const billData = bill?.data;

  const updateBill = useUpdateBill();

  useEffect(() => {
    if (bill) {
      form.reset({
        taxRate: billData.taxRate || 0,
        serviceCharge: billData.serviceCharge || 0,
        serviceChargeType: billData.serviceChargeType || "PERCENTAGE",
      });
    }
  }, [bill, form]);

  const onSubmit = async (data: TAddBillDataSchema) => {
    updateBill.mutate(data);
  };

  return (
    <AppLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 border p-6 rounded-lg"
        >
          <h1 className="text-neutral-600 text-xl">Bill Info</h1>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Tax Rate</FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter a tax rate for your hotel"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceChargeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Service Charge Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-primary/30 focus:border-none">
                          <SelectValue placeholder="Select service charge type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                          <SelectItem value="NUMBER">Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="serviceCharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Service Charge
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-primary/30 focus:border-none"
                        placeholder="Enter Service Charge"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button disabled={!form.formState.isDirty} type="submit">
                  Update Bill Info
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </AppLayout>
  );
};

export default BillingInfo;
