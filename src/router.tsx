import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home-page";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

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
]);
