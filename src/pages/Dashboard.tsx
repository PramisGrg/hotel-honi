import Sidebar from "@/components/common/Sidebar";
import burger from "@/assets/burger.png";
import person from "@/assets/person.png";
import Menu from "@/components/common/Menu";
import "driver.js/dist/driver.css";
import { useHotelInfoStore } from "@/store/hotel-store";
import Spinner from "@/components/common/spinner";
import ActiveHotel from "@/components/dashboard-in/active-hotel";
import { useSwitchHotel } from "@/queries/hotel/switch-hotel-queries";
import { useEffect } from "react";
import { useGetUserStore } from "@/store/user-store";

const Dashboard = () => {
  const { name } = useGetUserStore((state) => ({
    name: state.name,
  }));
  const { hotelId } = useHotelInfoStore((state) => ({
    hotelId: state.hotelId,
  }));

  const switchHotel = useSwitchHotel();

  useEffect(() => {
    if (hotelId && switchHotel.status === "idle") {
      switchHotel.mutate(hotelId);
    }
  }, [hotelId, switchHotel]);

  if (switchHotel.isPending) {
    return <Spinner />;
  }

  if (switchHotel.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="py-10 max-w-[700px] mx-auto p-4">
          {/*component 1*/}

          <div className="flex justify-between">
            <div id="name" className="">
              <h4 className="text-gray-600">Welcome back,</h4>
              <h1 className="text-xl font-bold">{name}</h1>
            </div>

            <ActiveHotel />
          </div>

          {/* conponent 3*/}
          <div className="py-8">
            <h4 className="text-sm pb-2 text-gray-600">
              You can perform some quick actions
            </h4>
            <div className="flex md:flex-row  flex-col gap-6">
              <div className="md:w-1/2 w-full flex bg-[#3636BC] justify-between p-4 rounded-xl">
                <div>
                  <h1 className="text-xl text-white">New Order</h1>
                  <p className="text-sm text-white">Add a new Kitchen order</p>
                </div>
                <img src={burger} alt="burger picture" />
              </div>
              <div
                id="book"
                className="md:w-1/2 w-full flex bg-[#268559] justify-between p-4 rounded-xl"
              >
                <div>
                  <h1 className="text-xl text-white">New Booking</h1>
                  <p className="text-sm text-white">
                    Add a booking from customer
                  </p>
                </div>
                <img src={person} alt="Person image" />
              </div>
            </div>
          </div>

          {/* Component 3*/}
          <div>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
