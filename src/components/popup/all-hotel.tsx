import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateHotel } from "./create-hotel";
import { useState, useCallback } from "react";
import { axiosAuthInstance } from "@/services/axios";
import endpoints from "@/lib/api.contant";
import { useHotelInfoStore } from "@/store/hotel-store";

type THotel = {
  hotel: {
    id: string;
    address: string;
    name: string;
  };
  role: {
    name: string;
  };
};

export function AllHotel() {
  const [allHotel, setAllHotel] = useState<THotel[]>([]);
  const {
    hotelName,
    activeHotelId,
    hotelAddress,
    setHotelId,
    setHotelName,
    setHotelAddress,
  } = useHotelInfoStore((state) => ({
    activeHotelId: state.activeHotelId,
    hotelAddress: state.hotelAddress,
    hotelName: state.hotelName,
    setHotelId: state.setHotelId,
    setHotelName: state.setHotelName,
    setHotelAddress: state.setHotelAddress,
  }));

  const handleSwitch = (id: string, name: string, address: string) => {
    setHotelId(id);
    setHotelName(name);
    setHotelAddress(address);
    console.log(hotelName);
    console.log(hotelAddress);
  };

  const handleGetAllHotel = useCallback(async () => {
    try {
      const response = await axiosAuthInstance.get(endpoints.hotel.allHotel);
      console.log(response, "👩‍❤️‍💋‍👩");
      const res = response.data.data;
      setAllHotel(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span
            onClick={handleGetAllHotel}
            className="text-sm cursor-pointer bg-blue-600 rounded"
          >
            Switch Hotel
          </span>
        </DialogTrigger>
        <DialogContent className="max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Switch Hotel</DialogTitle>
            <p className="text-sm text-gray-500">
              You can manage multiple hotels, select hotel you want to manage
            </p>
          </DialogHeader>
          <div className="h-[22rem] overflow-y-auto border border-gray-300 rounded-lg">
            <ul className="space-y-4 p-4">
              {allHotel.map((item) => (
                <li
                  key={item.hotel.id}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.hotel.name}
                    </h3>
                    {activeHotelId === item.hotel.id ? (
                      <h1 className="text-green-400">Active</h1>
                    ) : (
                      <button
                        onClick={() =>
                          handleSwitch(
                            item.hotel.id,
                            item.hotel.name,
                            item.hotel.address
                          )
                        }
                        className="bg-blue-500 p-2 text-white rounded-md"
                      >
                        Switch Pramis
                      </button>
                    )}
                  </div>
                  <div className="flex gap-6">
                    <p className="text-xs text-gray-600">
                      {item.hotel.address}
                    </p>
                    <span
                      className={`text-xs p-1 rounded-sm ${"bg-yellow-500 text-white"}`}
                    >
                      {item.role.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button type="submit">
              <CreateHotel onHotelCreated={handleGetAllHotel} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
