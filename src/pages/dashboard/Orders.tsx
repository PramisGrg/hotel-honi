import Sidebar from "@/components/common/Sidebar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { MdOutlineSingleBed } from "react-icons/md";

const Orders = () => {
  const [content, setContent] = useState("content-1");

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="py-20 max-w-[700px] mx-auto p-4">
          {/* Component 1 */}

          <div>
            <h1 className="text-xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-600">
              View and manage all your orders
            </p>
          </div>
          {/* Component 2 */}

          <div className="py-10">
            <Input className="w-full" placeholder="Search room" />
          </div>

          {/* Component 3 */}

          <div className="flex">
            <button
              className="w-1/2"
              onClick={() => {
                setContent("content-1");
              }}
            >
              <div
                className={`flex border-b-4 justify-center gap-2 ${
                  content === "content-1"
                    ? "text-blue-300 border-blue-300 "
                    : "text-gray-500 border-gray-500"
                }`}
              >
                <MdOutlineTableRestaurant className="h-7 w-7" />
                <p>Table Orders</p>
              </div>
            </button>

            <button
              className="w-1/2"
              onClick={() => {
                setContent("content-2");
              }}
            >
              <div
                className={`flex justify-center border-b-4 gap-2 ${
                  content === "content-2"
                    ? "text-blue-300 border-blue-400"
                    : "text-gray-500 border-gray-500"
                } `}
              >
                <MdOutlineSingleBed className="h-7 w-7" />
                <p>Room Orders</p>
              </div>
            </button>
          </div>
          {/* Content-1 */}

          <div className="pt-10">
            {content == "content-1" && (
              <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                <div className="bg-[#FFCBCB] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Table 34</h1>
                  <p className="text-gray-600">Occupied</p>
                </div>
                <div className="bg-[#B3E4B699] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Table 56</h1>
                  <p className="text-gray-600">Avaliable</p>
                </div>
                <div className="bg-[#E4DDB3] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Table 44</h1>
                  <p className="text-gray-600">Cleaning</p>
                </div>
                <div className="bg-[#E4DDB3] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Table 12</h1>
                  <p className="text-gray-600">Cleaning</p>
                </div>
                <div className="bg-[#B3E4B699] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Table 02</h1>
                  <p className="text-gray-600">Avaliable</p>
                </div>
              </div>
            )}
          </div>
          {/* Content-2 */}

          <div>
            {content == "content-2" && (
              <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                <div className="bg-[#FFCBCB] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Room 400</h1>
                  <p className="text-gray-600">Occupied</p>
                </div>
                <div className="bg-[#B3E4B699] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Room 403</h1>
                  <p className="text-gray-600">Avaliable</p>
                </div>
                <div className="bg-[#E4DDB3] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Room 44</h1>
                  <p className="text-gray-600">Cleaning</p>
                </div>
                <div className="bg-[#E4DDB3] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Room 47</h1>
                  <p className="text-gray-600">Cleaning</p>
                </div>
                <div className="bg-[#B3E4B699] p-4 space-y-2 text-center rounded-lg">
                  <h1 className="font-bold">Room 403</h1>
                  <p className="text-gray-600">Avaliable</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
