import { Switch } from "../ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import { useGetBill } from "@/queries/bill/get-bill-query";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { calculatePrice } from "@/helper/calculate-price";
import { useGetPayment } from "@/queries/payment/get-payment";
import { useGetStaff } from "@/queries/staff/get-staff-query";
import { UseGetCustomerQuery } from "@/queries/table/customer-table/get-cutomer-query";
import { Button } from "../ui/button";
import { useCheckout } from "@/queries/checkout/checkout";
import { toast } from "sonner";

interface CheckoutProps {
  showCheckoutSheet: boolean;
  setShowCheckoutSheet: (value: boolean) => void;
  totalAmount: number;
  orderId: string;
}

export function Checkout({
  showCheckoutSheet,
  setShowCheckoutSheet,
  totalAmount,
  orderId,
}: CheckoutProps) {
  // const { data: bill } = useGetBill();

  const [discountType, setDiscountType] = useState("");
  const [discount, setDiscount] = useState<number>();
  const [serviceCharge, setServiceCharge] = useState<number>();
  const [serviceChargeType, setServiceTypeCharge] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [tenderAmount, setTenderAmount] = useState<number>();
  const [showStaff, setShowStaff] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const totalBillPrice = calculatePrice({
    discountType,
    discount,
    serviceChargeType,
    serviceCharge,
    totalAmount,
  });

  const { data } = useGetPayment();
  const payment = data?.data || [];
  const { data: staff } = useGetStaff();
  const staffData = staff?.data || [];
  const { data: customer } = UseGetCustomerQuery({
    search: "",
  });
  const customerData = customer?.data || [];
  const createCheckout = useCheckout();

  const handleSubmit = () => {
    if (tenderAmount == undefined) {
      toast.error("Please, enter a valid tender amount");
      return;
    }

    let requiredData;
    if (staffId) {
      requiredData = {
        orderId,
        paymentDetails: {
          paymentMethodId: paymentMethodId,
          amount: tenderAmount,
          isChangeMoneyReturned: true,
        },
        discountType: "PERCENTAGE",
        staffId,
      };
    } else if (customerId) {
      requiredData = {
        orderId,
        paymentDetails: {
          paymentMethodId: paymentMethodId,
          amount: tenderAmount,
          isChangeMoneyReturned: true,
        },
        discountType: "PERCENTAGE",
        customerId,
      };
    } else {
      requiredData = {
        orderId,
        paymentDetails: {
          paymentMethodId: paymentMethodId,
          amount: tenderAmount,
          isChangeMoneyReturned: true,
        },
        discountType: "PERCENTAGE",
      };
    }
    createCheckout.mutate(requiredData);
    setShowCheckoutSheet(true);
  };

  const showStaffAndCustomer = () => {
    return (
      <div className="space-y-2">
        <p className="text-red-300 text-xs">
          The paid amount is not equal to actual bill amount, please select
          customer or staff to initiate credit
        </p>
        <div className="rounded-md">
          <button
            onClick={() => {
              setShowStaff(true);
            }}
            className={`${
              showStaff ? "bg-blue-400 text-white" : "text-black"
            } p-2 w-1/2 rounded-lg`}
          >
            Staff
          </button>
          <button
            onClick={() => {
              setShowStaff(false);
            }}
            className={`${
              showStaff ? "text-black" : "bg-blue-400 text-white"
            } p-2 w-1/2 rounded-lg`}
          >
            Customer
          </button>
        </div>
        {showStaff ? (
          <Select
            onValueChange={(value) => {
              setStaffId(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {staffData.map((staffSolo) => (
                  <SelectItem key={staffSolo.user.id} value={staffSolo.user.id}>
                    {staffSolo.user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Select
            onValueChange={(value) => {
              setCustomerId(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {customerData.map((customerSolo) => (
                  <SelectItem key={customerSolo.id} value={customerSolo.id}>
                    {customerSolo.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    );
  };

  return (
    <Sheet open={showCheckoutSheet} onOpenChange={setShowCheckoutSheet}>
      <SheetContent className="min-w-[60vw]" side={"right"}>
        <SheetHeader className="py-4">
          <SheetTitle>Checkout</SheetTitle>
          <SheetDescription>Total Amount : {totalAmount}</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4 border p-4 rounded-md">
            <h1>Bill Details</h1>
            <Input
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setDiscount(value);
              }}
              placeholder="Enter discount"
            />
            <Select
              onValueChange={(value) => {
                setDiscountType(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a discount Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="NUMBER">Number</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setServiceCharge(value);
              }}
              placeholder="Enter service charge"
            />

            <Select
              onValueChange={(value) => {
                setServiceTypeCharge(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Servicecharge Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="NUMBER">Number</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="text-gray-500 text-sm">
              Total Bill Price : {totalBillPrice.toFixed(2)}
            </div>
          </div>
          <div className="space-y-4">
            <h1>Total Bill Price: {totalBillPrice}</h1>
            <Select
              onValueChange={(value) => {
                setPaymentMethodId(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {payment.map((paymentMethod) => (
                    <SelectItem key={paymentMethod.id} value={paymentMethod.id}>
                      {paymentMethod.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setTenderAmount(undefined);
                } else {
                  setTenderAmount(Number(value));
                }
              }}
              placeholder="Amount payed by customer"
            />
            {tenderAmount !== undefined &&
              tenderAmount < totalBillPrice &&
              showStaffAndCustomer()}

            {tenderAmount !== undefined && tenderAmount > totalBillPrice && (
              <div className="space-y-4">
                <p>
                  Amount to return: {(tenderAmount - totalBillPrice).toFixed(2)}
                </p>
                <p className="space-x-4 flex ">
                  <p> Return Changes </p>
                  <Switch checked={showStaff} onCheckedChange={setShowStaff} />
                </p>
                {showStaff && showStaffAndCustomer()}
              </div>
            )}
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit} type="button">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
