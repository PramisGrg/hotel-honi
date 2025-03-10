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
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
