import { dishescolumns } from "@/components/columns/dishes-columns";
import { DishesTable } from "@/components/table/dishes-table";
import { useEffect, useState } from "react";
import { useGetDishes } from "@/queries/table/dishes-menu/get-dishes-query";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  const { data: dishesData } = useGetDishes();
  useEffect(() => {
    if (dishesData) {
      setDishes(dishesData.data);
    }
  }, [dishesData]);

  return (
    <div className="flex">
      <div className="w-full p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Food and Menu</h1>
          <p className="text-sm text-gray-600">
            View and manage all your Dishes
          </p>
        </div>
        <DishesTable columns={dishescolumns} data={dishes} />
      </div>
    </div>
  );
};

export default Dishes;
