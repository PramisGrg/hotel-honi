import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import CreateAccount from "./pages/auth/create-account";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import VerifyOTP from "./pages/auth/verify-otp";
import { Toaster } from "sonner";
import SetPassword from "./pages/auth/forgot-password/SetPassword";
import ResetPassword from "./pages/auth/forgot-password/ResetPassword";
import Checkout from "./pages/dashboard/Checkout";
import Customer from "./pages/dashboard/Customer";
import Orders from "./pages/dashboard/Orders";
import Settings from "./pages/dashboard/Settings";
import Helpcenter from "./pages/dashboard/Helpcenter";
import Room from "./pages/sidebar/room";
import FoodMenu from "./pages/sidebar/food-menu";
import Setting from "./pages/sidebar/setting";
import { UseHotelInfoStore } from "@/store/hotel-store";
import Spinner from "@/components/common/spinner";
import { useSwitchHotelMutation } from "@/queries/hotel/switch-hotel-queries";
import { useEffect } from "react";
import RoomInside from "./pages/sidebar/room-and-space/room";
import AppLayout from "./components/layout/app-layout";
import { useGetActiveHotel } from "./queries/hotel/active-hotel-query";

function App() {
  const { activeHotelId } = UseHotelInfoStore((state) => ({
    activeHotelId: state.activeHotelId,
  }));
  console.log(activeHotelId);

  const { data, isLoading } = useGetActiveHotel();

  const switchHotel = useSwitchHotelMutation();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (activeHotelId && activeHotelId !== data?.data.id) {
      switchHotel.mutate(activeHotelId);
    }
  }, [activeHotelId]);

  if (switchHotel.isPending) {
    return <Spinner />;
  }

  if (switchHotel.isError) {
    return <div>Error loading data</div>;
  }
  return (
    <>
      <Toaster richColors />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<CreateAccount />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/setpassword" element={<SetPassword />}></Route>
          <Route path="/verify" element={<VerifyOTP />}></Route>
        </Routes>

        <Routes>
          <Route path="/dashboard/checkout" element={<Checkout />}></Route>
          <Route path="/dashboard/customer" element={<Customer />}></Route>
          <Route path="/dashboard/orders" element={<Orders />}></Route>
          <Route path="/dashboard/settings" element={<Settings />}></Route>
          <Route path="/dashboard/helpcenter" element={<Helpcenter />}></Route>
        </Routes>

        <Routes>
          <Route path="/sidebar/room" element={<Room />}></Route>
          <Route path="/sidebar/food-menu" element={<FoodMenu />}></Route>
          <Route path="/sidebar/setting" element={<Setting />}></Route>
          <Route path="/sidebar/customer" element={<Customer />}></Route>
        </Routes>

        <Routes>
          <Route path="/sidebar/room-and-space" element={<AppLayout />}>
            <Route path="rooms" element={<RoomInside />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
