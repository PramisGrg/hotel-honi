import { useEffect, useState } from "react";
import { staffcolumn } from "@/components/columns/staff-columns";
// import { useDebounce } from "@/hooks/debounce";
// import { useDebounceValue } from "@/store/debounce-store";
import { useGetStaff } from "@/queries/staff/get.staff.query";
import { StaffTable } from "@/components/table/staff-table";
import AppLayout from "@/layout/dashboard-layout";

interface RequiredDataFormat {
  id: string;
  role: string;
  name: string;
  phoneNumber: string;
}

const Staff = () => {
  //   const { debounceRoomValue } = useDebounceValue((state) => ({
  //     debounceRoomValue: state.debounceRoomValue,
  //   }));

  //   const debounceSearchRoom = useDebounce(debounceRoomValue, 750);

  const [allStaff, setAllStaff] = useState<RequiredDataFormat[]>([]);

  const { data: staff } = useGetStaff();
  const staffData = staff?.data || [];

  useEffect(() => {
    if (staff?.data) {
      const formattedData = staffData.map((staffMember) => ({
        id: staffMember.user.id,
        role: staffMember.role.name,
        name: staffMember.user.name,
        phoneNumber: staffMember.user.phoneNumber,
      }));

      setAllStaff(formattedData);
    }
  }, [staff]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Staff</h1>
        <p className="text-neutral-400">View and manage all your staff</p>
      </div>
      <StaffTable columns={staffcolumn} data={allStaff} />
    </AppLayout>
  );
};

export default Staff;
