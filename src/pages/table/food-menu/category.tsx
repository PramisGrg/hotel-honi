import { useEffect, useState } from "react";
import { CategoryTable } from "@/components/table/category-table";
import { categorycolumns } from "@/components/columns/category-columns";
import { UseGetCategory } from "@/queries/table/category-menu/get.category.query";
import AppLayout from "@/layout/dashboard-layout";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const { data: categoryData } = UseGetCategory();
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data);
    }
  }, [categoryData]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Categories</h1>
        <p className="text-neutral-400">View and manage all your categories</p>
      </div>
      <CategoryTable columns={categorycolumns} data={categories} />
    </AppLayout>
  );
};

export default Category;
