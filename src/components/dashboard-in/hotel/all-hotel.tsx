// all-hotel.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateHotel } from "./create-hotel";
import { useState } from "react";
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
    activeHotelName,
    activeHotelId,
    setActiveHotelId,
    setActiveHotelName,
    setActiveHotelAddress,
  } = useHotelInfoStore((state) => ({
    activeHotelName: state.activeHotelName,
    activeHotelId: state.activeHotelId,
    setActiveHotelId: state.setActiveHotelId,
    setActiveHotelName: state.setActiveHotelName,
    setActiveHotelAddress: state.setActiveHotelAddress,
  }));

  const handleSwitch = (id: string, name: string, address: string) => {
    setActiveHotelId(id);
    setActiveHotelName(name);
    setActiveHotelAddress(address);
    console.log(activeHotelId);
    console.log(activeHotelName);
  };

  const handleGetAllHotel = async () => {
    try {
      const response = await axiosAuthInstance.get(endpoints.hotel.allHotel);
      const res = response.data.data;
      setAllHotel(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleGetAllHotel}
            className="text-sm text-white bg-blue-600"
          >
            Switch
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[550px]">
          <DialogHeader className="space-y-2">
            <DialogTitle>Switch Hotel</DialogTitle>
            <DialogDescription>
              You can manage multiple hotels, select hotel you want to manage
            </DialogDescription>
          </DialogHeader>
          <div className="h-[21rem] py-2 overflow-y-auto ">
            <ul className="space-y-5">
              {allHotel.map((item) => (
                <li key={item.hotel.id} className="bg-[#EFECFF] rounded-lg p-4">
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
                        className="bg-blue-500 p-2 text-white hover:text-gray-200 hover:shadow-md duration-300 rounded-md"
                      >
                        Switch
                      </button>
                    )}
                  </div>
                  <div className="flex gap-6">
                    <p className="text-gray-600">{item.hotel.address}</p>
                    <span className="text-xs p-1 rounded-sm bg-yellow-400 text-white">
                      {item.role.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button
              className="bg-blue-500 hover:shadow-md duration-300 hover:text-gray-300"
              type="submit"
            >
              <CreateHotel onHotelCreated={handleGetAllHotel} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
