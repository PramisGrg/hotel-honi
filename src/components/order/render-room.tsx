import { useGetRoomQuery } from "@/queries/table/room-table/get.room.query";
import ConfirmOrder from "./confirm-order";
import { useState } from "react";

const RenderRoom = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: room } = useGetRoomQuery({ search: "" });
  const rooms = room?.data || [];

  return (
    <section className="grid grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div
          className="border p-3 flex justify-between rounded-md hover:scale-105 transition-all duration-300 cursor-pointer"
          key={room.id}
          onClick={() => setIsDialogOpen(true)}
        >
          <h1 className="text-sm items-center flex">{room.name}</h1>
          <div className="lowercase text-xs bg-green-100 p-2 rounded-md">
            <p className="text-green-700">{room.status}</p>
          </div>
        </div>
      ))}

      <ConfirmOrder
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </section>
  );
};

export default RenderRoom;
