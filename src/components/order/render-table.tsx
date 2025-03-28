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

import { useGetTableQuery } from "@/queries/table/table-table/get.table.query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useGetDishesQuery } from "@/queries/table/dishes-menu/get.dishes.query";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCreateOrder } from "@/queries/order-and-kot/create-order";
import { cn } from "@/lib/utils";

export const RenderTable = () => {
  const [selectTableItem, setSelectedTableItem] = useState<AddDishData[]>([]);
  const [selectedTable, setSelectedTable] = useState<Data>();
  const [popup, setPopup] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: table } = useGetTableQuery({ search: "" });
  const { data: dish } = useGetDishesQuery();

  const createOrder = useCreateOrder();

  const tablesData = table?.data || [];
  const dishes = dish?.data || [];

  const handleClick = (table: Data) => {
    setPopup(true);
    setSelectedTable(table);
  };

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
        {tablesData.map((table) => (
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

      <Dialog open={popup} onOpenChange={setPopup}>
        <DialogContent className="min-w-[90vw] ">
          <DialogHeader>
            <DialogTitle>All Dishes: {selectedTable?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 min-h-[80vh] gap-4">
            <section className="col-span-2 border p-4">
              <section className="grid grid-cols-3 gap-4">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-2 border flex gap-2 text-sm rounded-md"
                  >
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={dish.image}
                      alt="menu items image"
                    />
                    <div className="flex-1 space-y-1">
                      <h1 className="text-xl">{dish.name}</h1>
                      <p className="pl-2 text-neutral-500">Rs {dish.price}</p>
                      <Button
                        onClick={() => handleAddItem(dish)}
                        disabled={isItemAdded(dish.id)}
                        className={cn(
                          "w-full py-2 rounded-md",
                          isItemAdded(dish.id)
                        )}
                      >
                        {isItemAdded(dish.id) ? "Added" : "Add"}
                      </Button>
                    </div>
                  </div>
                ))}
              </section>
            </section>

            <section className="col-span-1 border flex flex-col justify-between rounded-md p-3">
              <div className="space-y-2 p-2">
                {selectTableItem.map((items) => (
                  <div
                    key={items.id}
                    className="border rounded-md p-2 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2 items-center">
                        <img
                          className="h-10 w-10 rounded-md"
                          src={items.image}
                          alt="Item Image"
                        />
                        <h1 className="text-xl">{items.name}</h1>
                      </div>
                      <h3 className="text-neutral-600">Rs {items.price}</h3>
                    </div>
                    <Button className="w-full flex justify-between rounded-md text-sm">
                      <span
                        onClick={() => {
                          handleDecreaseQuantity(items.id);
                        }}
                      >
                        <Minus className="h-6 w-6" />
                      </span>
                      {items.quantity}
                      <span
                        onClick={() => {
                          handleIncreaseQuantity(items.id);
                        }}
                      >
                        <Plus className="h-6 w-6" />
                      </span>
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between py-2">
                  <h1>Total Price:</h1>
                  <span className="text-neutral-600 font-semibold">
                    {totalPrice}
                  </span>
                </div>
                <Button onClick={handleConfirmOrder} className="w-full">
                  Confirm Order
                </Button>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
