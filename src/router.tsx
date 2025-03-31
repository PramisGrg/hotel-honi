import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import VerifyOTP from "./pages/auth/verify-otp";
import ResetPassword from "./pages/auth/forgot-password/reset-password";
import SetPassword from "./pages/auth/forgot-password/set-password";
import VerifyOtpForgot from "./pages/auth/forgot-password/verify-otp-forgot";
import OnBoarding from "./pages/onboarding/onbaording";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./layout/app-layout";
import Room from "./pages/table/room-and-space/room";
import Space from "./pages/table/room-and-space/sapce";
import Table from "./pages/table/room-and-space/table";
import Dishes from "./pages/table/food-menu/dish";
import Category from "./pages/table/food-menu/category";
import Inventory from "./pages/table/inventory";
import Customer from "./pages/table/customer-and-supplier/customer";
import Supplier from "./pages/table/customer-and-supplier/supplier";
import Staff from "./pages/table/staff";
import HotelSetting from "./pages/hotel-settings";
import Setting from "./pages/setting";
import Order from "./pages/table/order";
import Kot from "./pages/dashboard/kot";
import KotUpdate from "./pages/dashboard/kot-update";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <VerifyOTP />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "verify-password",
    element: <VerifyOtpForgot />,
  },
  {
    path: "set-password",
    element: <SetPassword />,
  },
  {
    path: "onboarding",
    element: <OnBoarding />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "room",
        element: <Room />,
      },
      {
        path: "space",
        element: <Space />,
      },
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "dish",
        element: <Dishes />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "supplier",
        element: <Supplier />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "hotel-setting",
        element: <HotelSetting />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "kot/:orderId/:status",
        element: <Kot />,
      },
      {
        path: "kot-update/:orderId",
        element: <KotUpdate />,
      },
    ],
  },
]);
