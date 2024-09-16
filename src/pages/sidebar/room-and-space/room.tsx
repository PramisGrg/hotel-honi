import { useEffect, useState } from "react";
import { roomcolumns } from "@/components/columns/room-columns";
import { RoomTable } from "@/components/table/room-table";
import { UseGetRoomQuery } from "@/queries/table/room-table/get-room-query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";

const RoomInside = () => {
  const { debounceRoomValue } = useDebounceValue((state) => ({
    debounceRoomValue: state.debounceRoomValue,
  }));

  const debounceSearchRoom = useDebounce(debounceRoomValue, 750);

  const [allRooms, setAllRooms] = useState([]);

  const { data: rooms } = UseGetRoomQuery({ search: debounceSearchRoom });

  useEffect(() => {
    if (rooms) {
      setAllRooms(rooms.data);
    }
  }, [rooms]);

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        {/* Room and Spaces */}

        <div className="">
          <h1 className="text-xl">Spaces</h1>
          <p className="text-sm text-gray-600">
            View and manage all your rooms, spaces & tables
          </p>
        </div>

        <RoomTable columns={roomcolumns} data={allRooms} />
      </div>
    </div>
  );
};

export default RoomInside;
