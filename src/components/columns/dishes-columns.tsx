import { ColumnDef } from "@tanstack/react-table";
// import { Switch } from "../ui/switch";
import { EditMenuItems } from "../popup-table/dishes-table/edit-menu";
import { DeleteMenuItems } from "../popup-table/dishes-table/delete-menu";

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
    header: "Name",
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

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ getValue }) => {
  //     const status = getValue() as DishesColuumnRef["status"];
  //     const isEnabled = status === "Enabled";
  //     return (
  //       <div className="flex items-center gap-2">
  //         <Switch
  //           checked={isEnabled}
  //           className={isEnabled ? "bg-green-500" : "bg-red-500"}
  //         />
  //         <span
  //           className={`text-sm ${
  //             isEnabled ? "text-green-600" : "text-red-600"
  //           }`}
  //         >
  //           {status}
  //         </span>
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "category",
  //   header: "Category",
  // },

  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditMenuItems />
        <DeleteMenuItems />
      </div>
    ),
  },
];
