import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBill } from "@/queries/bill/get-bill-query";

interface BillData {
  taxRate: number;
  serviceChargeType: string;
  serviceCharge: number;
}

const BillingInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      taxRate: 0,
      serviceCharge: 0,
      serviceChargeType: "PERCENTAGE",
    },
  });

  const { data: bill } = useGetBill();
  const billData = bill?.data || {};

  const serviceChargeType = watch("serviceChargeType");

  useEffect(() => {
    if (bill) {
      reset({
        taxRate: billData.taxRate || 0,
        serviceCharge: billData.serviceCharge || 0,
        serviceChargeType: billData.serviceChargeType || "PERCENTAGE",
      });
    }
  }, [bill, reset]);

  const onSubmit = async (data: BillData) => {
    console.log(data, "This is data");
  };

  const handleServiceTypeChange = (value: string) => {
    setValue("serviceChargeType", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="p-6 space-y-4 w-4/6 border rounded-md">
      <div>
        <h1 className="text-xl font-semibold">Billing Information</h1>
        <p className="text-gray-400">Update billing information of hotel</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label>Tax Rate</Label>
          <Input
            type="number"
            {...register("taxRate", { valueAsNumber: true })}
          />
          {errors.taxRate && (
            <p className="text-sm text-red-500">{errors.taxRate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Service Charge Type</Label>
          <Select
            value={serviceChargeType}
            onValueChange={handleServiceTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              <SelectItem value="NUMBER">Number</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceChargeType && (
            <p className="text-sm text-red-500">
              {errors.serviceChargeType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Service Charge</Label>
          <Input
            type="number"
            {...register("serviceCharge", { valueAsNumber: true })}
          />
          {errors.serviceCharge && (
            <p className="text-sm text-red-500">
              {errors.serviceCharge.message}
            </p>
          )}
        </div>

        <Button disabled={!isDirty} type="submit">
          Update Bill Info
        </Button>
      </form>
    </div>
  );
};

export default BillingInfo;
