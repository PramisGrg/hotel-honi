import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { useGetTableQuery } from "@/queries/table/table-table/get-table-query";
import { useGetRoomQuery } from "@/queries/table/room-table/get-room-query";
import { useGetDishes } from "@/queries/table/dishes-menu/get-dishes-query";
import { Minus, Plus } from "lucide-react";
import { useCreateOrder } from "@/queries/order-and-kot/create-order";

interface Data {
  id: string;
  name: string;
  status: string;
}

interface DishData {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface AddDishData extends DishData {
  quantity: number;
}

const AddOrder = () => {
  const [showTable, setShowTable] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectTableItem, setSelectedTableItem] = useState<AddDishData[]>([]);
  const [selectedTable, setSelectedTable] = useState<Data>();
  const [popup, setPopup] = useState(false);

  const { data: table } = useGetTableQuery({ search: "" });
  const { data: room } = useGetRoomQuery({ search: "" });
  const { data: dish } = useGetDishes();
  const createOrder = useCreateOrder();

  const handleClick = (table: Data) => {
    setPopup(true);
    setSelectedTable(table);
  };

  const renderTable = () => {
    const tables = (table?.data || []) as Data[];
    const dishes = (dish?.data || []) as DishData[];

    const handleAddItem = (item: DishData) => {
      console.log(item, "This is item");
      setSelectedTableItem((prev) => {
        const exisitngItem = prev.find(
          (selectedItem) => selectedItem.id === item.id
        );
        if (exisitngItem) {
          return prev;
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    };

    const handleIncreaseQuantity = (itemId: string) => {
      setSelectedTableItem((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };

    const handleDecreaseQuantity = (itemId: string) => {
      setSelectedTableItem((prev) =>
        prev
          .map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      );
    };

    const handleConfirmOrder = async () => {
      if (!selectedTable?.id) return;
      const orderPayload = {
        orderFor: "TABLE",
        spaceId: selectedTable?.id,
        items: selectTableItem.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
      };
      console.log(orderPayload, "Data main");
      createOrder.mutate(orderPayload);

      setPopup(false);
      setIsDialogOpen(false);
    };

    const isItemAdded = (itemId: string) => {
      return selectTableItem.some((item) => item.id === itemId);
    };

    const totalPrice = selectTableItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return (
      <>
        <div className="grid grid-cols-3 gap-4">
          {tables.map((table) => (
            <div className="border p-3 rounded-md" key={table.id}>
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => {
                  handleClick(table);
                }}
              >
                <div className="text-sm items-center flex">{table.name}</div>
                <div className="lowercase text-xs bg-green-100 p-2 rounded-md">
                  <p className="text-green-700">{table.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single Dialog component outside the map */}
        <Dialog open={popup} onOpenChange={setPopup}>
          <DialogContent className="min-w-[90vw] ">
            <DialogHeader>
              <DialogTitle>All Dishes: {selectedTable?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 min-h-[80vh] gap-4">
              <div className="col-span-2 border p-4">
                <div className="grid grid-cols-3 gap-4">
                  {dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-2 border text-sm rounded-md"
                    >
                      <img
                        className="rounded-full h-12 w-12"
                        src={dish.image}
                        alt="menu items image"
                      />
                      <div className="flex justify-between py-1">
                        <p className="">{dish.name}</p>
                        <p className="text-blue-700">Rs {dish.price}</p>
                      </div>
                      <button
                        onClick={() => handleAddItem(dish)}
                        disabled={isItemAdded(dish.id)}
                        className={`w-full py-2 rounded-md ${
                          isItemAdded(dish.id)
                            ? "bg-gray-200 text-gray-500"
                            : "bg-blue-200 text-blue-700"
                        }`}
                      >
                        {isItemAdded(dish.id) ? "Added" : "Add"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 border flex flex-col justify-between rounded-md p-3">
                <div className="space-y-2 p-2">
                  {selectTableItem.map((items) => (
                    <div
                      key={items.id}
                      className="border rounded-md p-2 space-y-1"
                    >
                      <div className="flex justify-between">
                        <div className="flex space-x-4">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={items.image}
                            alt="Item Image"
                          />
                          <h1 className="pt-2">{items.name}</h1>
                        </div>
                        <h3 className="text-blue-500">Rs {items.price}</h3>
                      </div>
                      <button className="bg-blue-600 w-full flex justify-between px-2 text-white rounded-md text-sm py-1">
                        <span
                          onClick={() => {
                            handleDecreaseQuantity(items.id);
                          }}
                        >
                          <Minus className="h-4 w-4 pt-1" />
                        </span>
                        {items.quantity}
                        <span
                          onClick={() => {
                            handleIncreaseQuantity(items.id);
                          }}
                        >
                          <Plus className="h-4 w-4 pt-1" />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="w-full">
                  <div className="py-2">
                    Total Price:{" "}
                    <span className="text-blue-600">{totalPrice}</span>
                  </div>
                  <Button onClick={handleConfirmOrder} className="w-full">
                    Confirm Order
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const renderRoom = () => {
    const rooms = (room?.data || []) as Data[];
    return (
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div className="border p-3 rounded-md" key={room.id}>
            <div className="flex justify-between">
              <div className="text-sm items-center flex">{room.name}</div>
              <div className="lowercase text-xs bg-green-100 p-2 rounded-md">
                <p className="text-green-700">{room.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="active:scale-95 transition duration-300"
            onClick={() => setIsDialogOpen(true)}
          >
            Add Order
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[900px]">
          <DialogHeader>
            <DialogTitle>Add Order</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide order for table or room
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[500px]">
            <div className="py-4">
              <button
                onClick={() => {
                  setShowTable(true);
                }}
                className={`px-8 py-2 rounded-md ${
                  showTable
                    ? "bg-blue-500 text-white hover:bg-blue-500"
                    : "bg-white text-black"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => {
                  setShowTable(false);
                }}
                className={`px-8 py-2 rounded-md ${
                  showTable
                    ? "bg-none"
                    : "bg-blue-500 text-white hover:bg-blue-500"
                }`}
              >
                Room
              </button>
            </div>
            {showTable ? renderTable() : renderRoom()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddOrder;
