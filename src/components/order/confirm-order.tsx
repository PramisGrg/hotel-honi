import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useGetDishesQuery } from "@/queries/table/dishes-menu/get.dishes.query";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTableRoomStore } from "@/store/table.and.room.store";
import { TDishesResponseData } from "@/types/order.types";
import { useCreateOrder } from "@/queries/order-and-kot/create-order";

interface TAddDishData extends TDishesResponseData {
  quantity: number;
}

interface ConfirmOrderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}

const ConfirmOrder = ({ isDialogOpen, setIsDialogOpen }: ConfirmOrderProps) => {
  const { data: dish } = useGetDishesQuery();
  const dishes = dish?.data || [];

  const { table } = useTableRoomStore();

  const [selectTableItem, setSelectedTableItem] = useState<TAddDishData[]>([]);

  const createOrder = useCreateOrder();

  const handleAddItem = (item: TDishesResponseData) => {
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
    if (!table?.id) return;
    const orderPayload = {
      orderFor: "TABLE",
      spaceId: table?.id,
      items: selectTableItem.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
      })),
    };
    console.log(orderPayload, "Data main");
    createOrder.mutate(orderPayload);

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="min-w-[90vw] ">
        <DialogHeader>
          <DialogTitle>All Dishes: </DialogTitle>
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
              {selectTableItem.length > 0 ? (
                <div>
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
              ) : (
                <div className="flex items-center justify-center">
                  <h1 className="text-neutral-500">No dishes selected</h1>
                </div>
              )}
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
  );
};

export default ConfirmOrder;
