import { ColumnDef } from "@tanstack/react-table";
import { DeleteStaff } from "../popup-table/staff-table/delete-staff";
import { EditStaff } from "../popup-table/staff-table/edit-staff";

export type StaffTableCloumnRef = {
  id: string;
  role: string;
  name: string;
  phoneNumber: string;
};

export const staffcolumn: ColumnDef<StaffTableCloumnRef>[] = [
  {
    accessorKey: "name",
    header: "Staff Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        <EditStaff />
        <DeleteStaff />
      </div>
    ),
  },
];
