import { useEffect, useState } from "react";
import { CategoryTable } from "@/components/table/category-table";
import { categorycolumns } from "@/components/columns/category-columns";
import { UseGetCategory } from "@/queries/table/category-menu/get-category-query";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const { data: categoryData } = UseGetCategory();
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data);
    }
  }, [categoryData]);

  return (
    <div className="flex">
      <div className="w-full p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Food and Menu</h1>
          <p className="text-sm text-gray-600">
            View and manage all your categories
          </p>
        </div>
        <CategoryTable columns={categorycolumns} data={categories} />
      </div>
    </div>
  );
};

export default Categories;
