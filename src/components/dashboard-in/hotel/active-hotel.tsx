import { useEffect } from "react";
import { UseHotelInfoStore } from "@/store/hotel-store";
import { AllHotel } from "./all-hotel";
import { useGetActiveHotel } from "@/queries/hotel/active-hotel-query";

const ActiveHotel = () => {
  const {
    activeHotelName,
    activeHotelAddress,
    setActiveHotelId,
    setActiveHotelName,
    setActiveHotelAddress,
  } = UseHotelInfoStore((state) => ({
    activeHotelId: state.activeHotelId,
    activeHotelName: state.activeHotelName,
    activeHotelAddress: state.activeHotelAddress,
    setActiveHotelId: state.setActiveHotelId,
    setActiveHotelName: state.setActiveHotelName,
    setActiveHotelAddress: state.setActiveHotelAddress,
  }));

  const { data } = useGetActiveHotel();

  useEffect(() => {
    if (data && data.data) {
      setActiveHotelId(data.data.id);
      setActiveHotelName(data.data.name);
      setActiveHotelAddress(data.data.address);
    }
  }, [setActiveHotelName, setActiveHotelAddress, setActiveHotelId, data]);

  return (
    <div className="absolute right-0 top-0">
      <div className="flex space-x-8 p-6">
        <div className="flex">
          {/* <img className="w-12 h-12 rounded-full" src={person} /> */}
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{activeHotelName}</h1>
            <p className="text-sm">{activeHotelAddress}</p>
          </div>
        </div>
        <AllHotel />
      </div>
    </div>
  );
};

export default ActiveHotel;
