import BillingInfo from "@/components/hotel-setting/billing-info";
import HotelBasicInfo from "@/components/hotel-setting/hotel-basic-info";
import PaymentMethod from "@/components/hotel-setting/payment-method";
import Printer from "@/components/hotel-setting/printer";
import { useState } from "react";

const HotelSetting = () => {
  const [toggle, setToggle] = useState("Basic-info");

  return (
    <div className="w-full p-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Hotel Setting</h1>
        <p className="text-sm text-gray-600">
          Manage your hotel information and settings
        </p>
      </div>

      <div className="flex space-x-10">
        <button
          onClick={() => setToggle("Basic-info")}
          className={`p-2 w-40 rounded-md transition-colors ${
            toggle === "Basic-info" ? "bg-blue-500 text-white" : "bg-blue-50"
          }`}
        >
          Basic Info
        </button>
        <button
          onClick={() => setToggle("Billing-info")}
          className={`p-2 w-40 rounded-md transition-colors ${
            toggle === "Billing-info" ? "bg-blue-500 text-white" : "bg-blue-50"
          }`}
        >
          Billing Info
        </button>
        <button
          onClick={() => setToggle("Printer")}
          className={`p-2 w-40 rounded-md transition-colors ${
            toggle === "Printer" ? "bg-blue-500 text-white" : "bg-blue-50"
          }`}
        >
          Printer
        </button>
        <button
          onClick={() => setToggle("Payment-method")}
          className={`p-2 w-40 rounded-md transition-colors ${
            toggle === "Payment-method"
              ? "bg-blue-500 text-white"
              : "bg-blue-50"
          }`}
        >
          Payment Method
        </button>
      </div>

      {toggle === "Basic-info" && <HotelBasicInfo />}
      {toggle === "Billing-info" && <BillingInfo />}
      {toggle === "Printer" && <Printer />}
      {toggle === "Payment-method" && <PaymentMethod />}
    </div>
  );
};

export default HotelSetting;
