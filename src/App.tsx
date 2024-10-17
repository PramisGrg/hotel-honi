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
import Orders from "./pages/dashboard/Orders";
import Helpcenter from "./pages/dashboard/Helpcenter";
import Setting from "./pages/sidebar/setting";
import { UseHotelInfoStore } from "@/store/hotel-store";
import Spinner from "@/components/common/spinner";
import { useSwitchHotelMutation } from "@/queries/hotel/switch-hotel-queries";
import { useEffect } from "react";
import AppLayout from "./components/layout/app-layout";
import { useGetActiveHotel } from "./queries/hotel/active-hotel-query";
import Room from "./pages/sidebar/room-and-space/room";
import Space from "./pages/sidebar/room-and-space/sapce";
import Table from "./pages/sidebar/room-and-space/table";
import Dishes from "./pages/sidebar/food-menu/dish";
import Categories from "./pages/sidebar/food-menu/category";
import Supplier from "./pages/sidebar/customer-and-supplier/supplier";
import Customer from "./pages/sidebar/customer-and-supplier/customer";
import Inventory from "./pages/dashboard/inventory";

function App() {
  const { activeHotelId } = UseHotelInfoStore((state) => ({
    activeHotelId: state.activeHotelId,
  }));

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
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/setpassword" element={<SetPassword />}></Route>
          <Route path="/verify" element={<VerifyOTP />}></Route>
        </Routes>

        <Routes>
          <Route path="/dashboard/" element={<AppLayout />}>
            <Route path="home" element={<Dashboard />}></Route>

            <Route path="customers" element={<Customer />}></Route>
            <Route path="suppliers" element={<Supplier />}></Route>

            <Route path="dishes" element={<Dishes />}></Route>
            <Route path="categories" element={<Categories />}></Route>

            <Route path="rooms" element={<Room />}></Route>
            <Route path="spaces" element={<Space />}></Route>
            <Route path="tables" element={<Table />}></Route>

            <Route path="setting" element={<Setting />}></Route>

            <Route path="inventory" element={<Inventory />}></Route>
          </Route>
        </Routes>

        <Routes>
          <Route path="/dashboard/checkout" element={<Checkout />}></Route>
          <Route path="/dashboard/orders" element={<Orders />}></Route>
          <Route path="/dashboard/helpcenter" element={<Helpcenter />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
