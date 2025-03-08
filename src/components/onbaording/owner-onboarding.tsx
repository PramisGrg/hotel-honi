import { Hotel } from "lucide-react";
import { useState } from "react";
import { CreateHotelOnboarding } from "./create-hotel-onboarding";
import { Button } from "../ui/button";

const OwnerOnBaording = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="items-center justify-center flex flex-col p-8 space-y-4 w-[450px] border border-dotted">
      <Hotel className="text-primary h-16 w-16" />
      <h1 className="font-semibold text-xl">First, add hotel</h1>
      <p className="text-neutral-500">
        Create and manage hotel using HotelHoni
      </p>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        className="py-2 w-full text-center rounded-md"
      >
        CreateHotel
      </Button>
      <CreateHotelOnboarding isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default OwnerOnBaording;
