import BillingInfo from "@/components/hotel-setting/billing-info";
import GeneralInfo from "@/components/hotel-setting/general-info";
import HotelBasicInfo from "@/components/hotel-setting/hotel-basic-info";
import PaymentMethod from "@/components/hotel-setting/payment-method";
import AppLayout from "@/layout/dashboard-layout";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HotelSetting = () => {
  const [toggle, setToggle] = useState("General-info");

  return (
    <AppLayout className="space-y-6">
      <div className="flex space-x-8">
        <button
          className={cn(
            "w-32 pb-2 border-b-2 h-8 transition-all duration-300",
            toggle === "General-info" ? "border-primary " : "border-transparent"
          )}
          onClick={() => setToggle("General-info")}
        >
          General
        </button>
        <button
          className={cn(
            "w-32 pb-2 border-b-2 h-8 transition-all duration-300",
            toggle === "Payment-method"
              ? "border-primary "
              : "border-transparent"
          )}
          onClick={() => setToggle("Payment-method")}
        >
          Payment Method
        </button>
      </div>

      <div className="overflow-hidden relative">
        <div
          key={toggle}
          className="transition-opacity duration-500 ease-in-out opacity-100"
        >
          {toggle === "General-info" && <GeneralInfo />}
          {toggle === "Payment-method" && <PaymentMethod />}
        </div>
      </div>
    </AppLayout>
  );
};

export default HotelSetting;
