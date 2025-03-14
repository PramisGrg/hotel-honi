import { AreaChartComponent } from "@/components/dashboard/charts/area-chart";
import { PieChartComponent } from "@/components/dashboard/charts/pie-chart";
import { useActiveHotelStore } from "@/store/active.hotel.store";
import { useUserStore } from "@/store/user.store";
import { Home } from "lucide-react";

const UserDetails = () => {
  const { user } = useUserStore();
  const { activeHotel } = useActiveHotelStore();

  return (
    <div className="space-y-6">
      <p className="text-neutral-500 text-xl">Welcome, {user?.name} 👋</p>
      <div className="flex gap-4 items-center">
        <Home className="text-primary w-10 h-10" />
        <div>
          <p className="text-xl text-neutral-500">{activeHotel?.name}</p>
          <p className="text-sm text-neutral-500">{activeHotel?.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <AreaChartComponent />
        <PieChartComponent />
      </div>
    </div>
  );
};

export default UserDetails;
