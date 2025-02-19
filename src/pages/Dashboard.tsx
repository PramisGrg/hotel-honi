import burger from "@/assets/burger.png";
import person from "@/assets/person.png";
import MenuLinks from "@/components/dashboard-in/menu-links";
import "driver.js/dist/driver.css";
import ActiveHotel from "@/components/dashboard-in/hotel/active-hotel";
import UserInfo from "@/components/dashboard-in/user-info";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <div className="py-10 max-w-[700px] mx-auto p-4">
          {/*component 1*/}

          <div className="flex justify-between">
            <UserInfo />

            <ActiveHotel />
          </div>

          {/* conponent 2*/}
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
            <MenuLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
