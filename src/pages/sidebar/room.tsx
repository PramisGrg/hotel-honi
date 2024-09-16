import Sidebar from "@/components/common/Sidebar";
import { SpaceTable } from "@/components/table/space-table";
import { useEffect, useState } from "react";
import { spacecolumns } from "@/components/columns/space-columns";
import { tablecolumns } from "@/components/columns/table-columns";
import { roomcolumns } from "@/components/columns/room-columns";
import { RoomTable } from "@/components/table/room-table";
import { TableTable } from "@/components/table/table-table";
import { UseGetSpaceQuery } from "@/queries/table/space-table/get-spaces-query";
import { UseGetTableQuery } from "@/queries/table/table-table/get-table-query";
import { UseGetRoomQuery } from "@/queries/table/room-table/get-room-query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";

const Room = () => {
  const { debounceRoomValue, debounceSpaceValue, debounceTableValue } =
    useDebounceValue((state) => ({
      debounceRoomValue: state.debounceRoomValue,
      debounceSpaceValue: state.debounceSpaceValue,
      debounceTableValue: state.debounceTableValue,
    }));

  const debounceSearchRoom = useDebounce(debounceRoomValue, 750);
  const debounceSearchSpace = useDebounce(debounceSpaceValue, 750);
  const debounceSearchTable = useDebounce(debounceTableValue, 750);

  const [toggle, setToggle] = useState("space");
  const [allSpaces, setAllSpaces] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [allRooms, setAllRooms] = useState([]);

  const { data: spaces } = UseGetSpaceQuery({ search: debounceSearchSpace });
  const { data: tables } = UseGetTableQuery({ search: debounceSearchTable });
  const { data: rooms } = UseGetRoomQuery({ search: debounceSearchRoom });

  useEffect(() => {
    if (spaces) {
      setAllSpaces(spaces.data);
    }
  }, [spaces]);

  useEffect(() => {
    if (tables) {
      setAllTables(tables.data);
    }
  }, [tables]);

  useEffect(() => {
    if (rooms) {
      setAllRooms(rooms.data);
    }
  }, [rooms]);

  return (
    <div className="flex">
      <div className="z-40">
        <Sidebar />
      </div>
      <div className="w-full p-8">
        {/* Room and Spaces */}

        <div className="">
          <h1 className="text-xl">Spaces</h1>
          <p className="text-sm text-gray-600">
            View and manage all your rooms, spaces & tables
          </p>
        </div>

        {/* Button */}
        <div className="py-8 flex gap-20">
          <button
            onClick={() => setToggle("space")}
            className={`${
              toggle === "space" ? "bg-blue-600 text-white" : "bg-white"
            } p-2 rounded-md px-4`}
          >
            Spaces
          </button>
          <button
            onClick={() => setToggle("room")}
            className={`${
              toggle === "room" ? "bg-blue-600 text-white" : "bg-white"
            } p-2 rounded-md px-4`}
          >
            Rooms
          </button>
          <button
            onClick={() => setToggle("table")}
            className={`${
              toggle === "table" ? "bg-blue-600 text-white" : "bg-white"
            } p-2 rounded-md px-4`}
          >
            Tables
          </button>
        </div>
        {/* <div>
          <Input
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          ></Input>
        </div> */}

        {/* Conditional Rendering */}
        {toggle === "space" && (
          <SpaceTable columns={spacecolumns} data={allSpaces} />
        )}
        {toggle === "room" && (
          <RoomTable columns={roomcolumns} data={allRooms} />
        )}
        {toggle === "table" && (
          <TableTable columns={tablecolumns} data={allTables} />
        )}
      </div>
    </div>
  );
};

export default Room;
