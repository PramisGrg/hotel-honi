import {
  dishescolumns,
  DishesColuumnRef,
} from "@/components/columns/category-columns";
import Sidebar from "@/components/common/Sidebar";
import { DishesTable } from "@/components/table/dishes-table";
import { useState } from "react";
import { MdOutlineFastfood } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import person from "@/assets/leftImage.png";
import { CategoryTable } from "@/components/table/category-table";

const dishesMockData: DishesColuumnRef[] = [
  {
    id: 1,
    name: "Antons Savill",
    image: person,
    price: "1",
    status: "Enabled",
    category: "veg mom",
  },
  {
    id: 2,
    name: "Olivie Buggs",
    image: person,
    price: "2",
    status: "Disabled",
    category: "momo",
  },
  {
    id: 3,
    name: "Brendon Bains",
    image: person,
    price: "3",
    status: "Enabled",
    category: "coke",
  },
  {
    id: 4,
    name: "Donnie Fahy",
    image: person,
    price: "4",
    status: "Disabled",
    category: "coke",
  },
];

const FoodMenu = () => {
  const data = dishesMockData;
  const [select, setSelect] = useState("dishes");

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Food and Menu</h1>
          <p className="text-sm text-gray-600">
            View and manage all your food menu and categories
          </p>
        </div>

        {/* Dishes and Categories toggle */}
        <div className="flex space-x-12">
          <button
            onClick={() => setSelect("dishes")}
            className={`${
              select === "dishes"
                ? "text-blue-400 border-blue-400"
                : "text-gray-900"
            } flex gap-4 pb-2 border-b-4`}
          >
            <MdOutlineFastfood className="h-6 w-6" />
            <h4>Dishes</h4>
          </button>
          <button
            onClick={() => setSelect("categories")}
            className={`${
              select === "categories"
                ? "text-blue-400 border-blue-400"
                : "text-gray-900"
            } flex gap-4 pb-2 border-b-4`}
          >
            <TbCategory className="h-6 w-6" />
            <h4>Categories</h4>
          </button>
        </div>
        <div>
          {select === "dishes" && (
            <DishesTable columns={dishescolumns} data={data} />
          )}
        </div>
        <div>
          {select === "categories" && (
            <CategoryTable columns={dishescolumns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
