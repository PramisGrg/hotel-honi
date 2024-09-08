import { useEffect } from "react";
import { axiosAuthInstance } from "@/services/axios";
import endpoints from "@/lib/api.contant";
import { useHotelInfoStore } from "@/store/hotel-store";
import person from "@/assets/person.png";
import { AllHotel } from "../popup/all-hotel";
import { useQuery } from "@tanstack/react-query";

interface ActiveHotelData {
  id: string;
  name: string;
  address: string;
}

const ActiveHotel = () => {
  const {
    hotelName,
    hotelAddress,
    setActiveHotelId,
    setHotelAddress,
    setHotelName,
  } = useHotelInfoStore((state) => ({
    hotelName: state.hotelName,
    hotelAddress: state.hotelAddress,
    setActiveHotelId: state.setActiveHotelId,
    setHotelAddress: state.setHotelAddress,
    setHotelName: state.setHotelName,
  }));

  const { data } = useQuery<ActiveHotelData & Error>({
    queryKey: ["activeHotel"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get(
        endpoints.hotel.getActiveHotel
      );
      console.log(response);
      return response.data.data;
    },
  });
  useEffect(() => {
    if (data) {
      setActiveHotelId(data.id);
      setHotelAddress(data.address);
      setHotelName(data.name);
    }
  }, [setActiveHotelId, setHotelAddress, setHotelName, data]);

  return (
    <div>
      <h4 className="text-sm text-gray-500">Your current active hotel</h4>
      <div className="flex space-x-14 rounded-md p-4 bg-gray-100">
        <div className="flex">
          <img className="w-12 h-12 rounded-full" src={person} />
          <div className="flex flex-col">
            <h1>{hotelName}</h1>
            <p>{hotelAddress}</p>
          </div>
        </div>
        <button
          // onClick={handleSwitch}
          className="flex gap-2 p-2 justify-center items-center bg-blue-600 text-white rounded-md"
        >
          <AllHotel />
        </button>
      </div>
    </div>
  );
};

export default ActiveHotel;
