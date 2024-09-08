import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import CreateAccount from "./pages/auth/create-account";
import Login from "./pages/auth/login";
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

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
