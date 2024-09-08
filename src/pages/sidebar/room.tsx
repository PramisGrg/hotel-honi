import Sidebar from "@/components/common/Sidebar";
import { SpaceTable } from "@/components/table/space-table";
import { useState } from "react";
import {
  SpaceTableRef,
  spacecolumns,
} from "@/components/columns/space-columns";
import RoomTable from "@/components/table/RoomTable";
import TableTable from "@/components/table/TableTable";

const spaceMockData: SpaceTableRef[] = [
  {
    id: 1,
    name: "Antons Savill",
    room: 1,
    table: 1,
    status: "Available",
  },
  {
    id: 2,
    name: "Olivie Buggs",
    room: 2,
    table: 2,
    status: "Unavailable",
  },
  {
    id: 3,
    name: "Brendon Bains",
    room: 3,
    table: 3,
    status: "Available",
  },
  {
    id: 4,
    name: "Donnie Fahy",
    room: 4,
    table: 4,
    status: "Available",
  },
  {
    id: 36,
    name: "Gerri Beazey",
    room: 36,
    table: 36,
    status: "Unavailable",
  },
  {
    id: 37,
    name: "Clarie Eastgate",
    room: 37,
    table: 37,
    status: "Available",
  },
  {
    id: 38,
    name: "Avie Tume",
    room: 38,
    table: 38,
    status: "Available",
  },
  {
    id: 39,
    name: "Darryl Richardson",
    room: 39,
    table: 39,
    status: "Available",
  },
  {
    id: 40,
    name: "Phylis Studdal",
    room: 40,
    table: 40,
    status: "Available",
  },
];

const Room = () => {
  const data = spaceMockData;

  const [toggle, setToggle] = useState("space");

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

        {/* Conditional Rendering */}
        {toggle === "space" && (
          <SpaceTable columns={spacecolumns} data={data} />
        )}
        {toggle === "room" && <RoomTable />}
        {toggle === "table" && <TableTable />}
      </div>
    </div>
  );
};

export default Room;
