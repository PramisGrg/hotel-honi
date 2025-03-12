import SpinnerCircle from "@/components/common/spinner-circle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import AppLayout from "@/layout/dashboard-layout";
import { useGetActiveHotel } from "@/queries/hotel/get.active.hotel.query";
import { useGetAllHotels } from "@/queries/hotel/get.all.hotels.query";
import { useSwitchHotelQuery } from "@/queries/hotel/switch.hotel.query";
import { useUserStore } from "@/store/user.store";

const Dashboard = () => {
  const { data: allHotels } = useGetAllHotels();

  const allHotelsData = allHotels?.data;

  const { user } = useUserStore();

  const { failureCount, isLoading } = useGetActiveHotel();

  const activateHotel = useSwitchHotelQuery();

  const handleSwtichToggle = (hotelId: string) => {
    console.log(hotelId, "This is hotel id");
    activateHotel.mutate(hotelId);
  };

  if (failureCount >= 1) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-neutral-700">
              Activate a hotel before you proceed
            </DialogTitle>
          </DialogHeader>
          <div>
            {isLoading ? (
              <SpinnerCircle loaderWrapperStyle="h-72" />
            ) : (
              <div>
                {allHotelsData?.map((item) => (
                  <div
                    className="flex justify-between items-center p-4"
                    key={item.hotel.id}
                  >
                    <div>
                      <h1 className="text-neutral-500 font-semibold">
                        {item.hotel.name}
                      </h1>
                      <p className="text-sm text-neutral-400">
                        {item.hotel.address}
                      </p>
                    </div>
                    <Switch
                      onCheckedChange={() => handleSwtichToggle(item.hotel.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <AppLayout>
      <h1>{user?.name}</h1>
    </AppLayout>
  );
};

export default Dashboard;
