import { useEffect, useState } from "react";
import { roomcolumns } from "@/components/columns/room-columns";
import { RoomTable } from "@/components/table/room-table";
import { useGetRoomQuery } from "@/queries/table/room-table/get-room-query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";

const Room = () => {
  const { debounceRoomValue } = useDebounceValue((state) => ({
    debounceRoomValue: state.debounceRoomValue,
  }));

  const debounceSearchRoom = useDebounce(debounceRoomValue, 750);

  const [allRooms, setAllRooms] = useState([]);

  const { data: rooms } = useGetRoomQuery({ search: debounceSearchRoom });

  useEffect(() => {
    if (rooms) {
      setAllRooms(rooms.data);
    }
  }, [rooms]);

  return (
    <div className="flex">
      <div className="w-full p-8 space-y-6">
        <div className="">
          <h1 className="text-xl">Room</h1>
          <p className="text-sm text-gray-600">
            View and manage all your rooms
          </p>
        </div>

        <RoomTable columns={roomcolumns} data={allRooms} />
      </div>
    </div>
  );
};

export default Room;
