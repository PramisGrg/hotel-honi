import { useEffect, useState } from "react";
import { roomcolumns } from "@/components/columns/room-columns";
import { RoomTable } from "@/components/table/room-table";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";
import AppLayout from "@/layout/dashboard-layout";
import { useGetRoomQuery } from "@/queries/table/room-table/get.room.query";
import { TGetRoomResponseData } from "@/types/table.types";

const Room = () => {
  const { debounceRoomValue } = useDebounceValue((state) => ({
    debounceRoomValue: state.debounceRoomValue,
  }));

  const debounceSearchRoom = useDebounce(debounceRoomValue, 750);

  const [allRooms, setAllRooms] = useState<TGetRoomResponseData[]>([]);

  const { data: rooms } = useGetRoomQuery({ search: debounceSearchRoom });

  useEffect(() => {
    if (rooms) {
      setAllRooms(rooms.data);
    }
  }, [rooms]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Room</h1>
        <p className="text-neutral-400">View and manage all your rooms</p>
      </div>
      <RoomTable columns={roomcolumns} data={allRooms} />
    </AppLayout>
  );
};

export default Room;
