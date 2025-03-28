import { useGetRoomQuery } from "@/queries/table/room-table/get.room.query";

const RenderRoom = () => {
  const { data: room } = useGetRoomQuery({ search: "" });
  const rooms = room?.data || [];

  return (
    <section className="grid grid-cols-3 gap-4">
      {rooms.map((room) => (
        <div
          className="border p-3 flex justify-between rounded-md"
          key={room.id}
        >
          <h1 className="text-sm items-center flex">{room.name}</h1>
          <div className="lowercase text-xs bg-green-100 p-2 rounded-md">
            <p className="text-green-700">{room.status}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RenderRoom;
