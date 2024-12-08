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
import React, { useState } from "react";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export interface KotItem {
  id?: string;
  kotId: string;
  quantity: number;
  status: string;
  item: {
    id: string;
    name: string;
    price: number;
  };
}

export interface Kot {
  id: string;
  kotNumber: number;
  status: string;
  KotItems: KotItem[];
}
interface CheckoutProps {
  showCheckoutSheet: boolean;
  setShowCheckoutSheet: (value: boolean) => void;
  totalAmount: number;
  orderId: string;
  kotData: Kot[];
}

export function Checkout({
  showCheckoutSheet,
  setShowCheckoutSheet,
  totalAmount,
  orderId,
  kotData,
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
  const activeHotelInfo = JSON.parse(
    localStorage.getItem("hotel-info-store") || ""
  );

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

  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
    if (!input) {
      throw new Error("Html element is not slected for pdf");
    }
    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF();
        const imgWidth = 200;
        const scaleFactor = 0.8;
        const padding = 10;

        const imgHeight =
          (canvas.height * imgWidth * scaleFactor) / canvas.width;

        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          padding,
          padding,
          imgWidth - 2 * padding,
          imgHeight
        );

        pdf.save("invoice-file.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
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
      <SheetContent className="min-w-[70vw]" side={"right"}>
        <SheetHeader className="py-4">
          <SheetTitle>Checkout</SheetTitle>
          <SheetDescription>Total Amount : {totalAmount}</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-150px)] overflow-hidden">
          <div className="space-y-4 overflow-y-auto">
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
            <div className="space-y-4 p-4 rounded-md border">
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
                      <SelectItem
                        key={paymentMethod.id}
                        value={paymentMethod.id}
                      >
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
                    Amount to return:{" "}
                    {(tenderAmount - totalBillPrice).toFixed(2)}
                  </p>
                  <p className="space-x-4 flex ">
                    <p> Return Changes </p>
                    <Switch
                      checked={showStaff}
                      onCheckedChange={setShowStaff}
                    />
                  </p>
                  {showStaff && showStaffAndCustomer()}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="rounded-md border">
              <div className="p-4">
                <button
                  onClick={handleDownloadPDF}
                  className="p-2 rounded-md text-xs border"
                >
                  downLoad pdf
                </button>
              </div>
              <div
                id="pdf-content"
                className="p-6 bg-white text-sm flex flex-col min-h-[550px] justify-between rounded-lg shadow-md"
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {activeHotelInfo.state.activeHotelName}
                  </h1>
                  <h2 className="text-gray-500 text-sm">
                    {activeHotelInfo.state.activeHotelAddress}
                  </h2>
                  <h1 className="py-4 text-xl font-semibold text-gray-700">
                    Estimated Invoice
                  </h1>
                </div>

                <div className="flex text-gray-500 justify-between mb-6">
                  <div>
                    <h1 className="font-medium">Invoice Number</h1>
                    <span className="text-xs">INV-{new Date().getTime()}</span>
                  </div>
                  <div className="text-right">
                    <h1>Date: {new Date().toLocaleDateString()}</h1>
                    <h1>Payment Type: Card</h1>
                  </div>
                </div>

                <table className="w-full text-sm text-gray-700 border-collapse mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Item
                      </th>
                      <th className="px-4 py-2 text-center font-semibold">
                        Qty
                      </th>
                      <th className="px-4 py-2 text-center font-semibold">
                        Rate
                      </th>
                      <th className="px-4 py-2 text-right font-semibold">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {kotData.map((kot, index) => (
                      <React.Fragment key={index}>
                        {kot.KotItems.map((kotSolo, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="px-4 py-3">{kotSolo.item.name}</td>
                            <td className="px-4 py-3 text-center">
                              {kotSolo.quantity}
                            </td>
                            <td className="px-4 py-3 text-center">
                              Rs {kotSolo.item.price.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              Rs{" "}
                              {(kotSolo.quantity * kotSolo.item.price).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="font-bold text-lg text-gray-900">
                      Rs {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
