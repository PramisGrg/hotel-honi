import { ColumnDef } from "@tanstack/react-table";
import { EditDish } from "../popup-table/dishes-table/edit-dish";
import { DeleteDish } from "../popup-table/dishes-table/delete-dish";

export type DishesColuumnRef = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
};

export const dishescolumns: ColumnDef<DishesColuumnRef>[] = [
  {
    accessorKey: "name",
    header: "Dish name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue }) => {
      const imageUrl = getValue<string>();
      return (
        <img
          src={imageUrl}
          alt="Dish"
          className="w-8 h-8 rounded-lg object-cover"
        />
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditDish />
        <DeleteDish />
      </div>
    ),
  },
];
