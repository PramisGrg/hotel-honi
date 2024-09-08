import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { TbCube } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiGlobe } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";

export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    icons: <MdOutlineDashboard />,
    path: "/dashboard",
  },
  {
    id: 2,
    title: "Bookings",
    icons: <AiOutlineCalendar />,
    path: "/dashboard/bookings",
  },
  {
    id: 3,
    title: "Room & Spaces",
    icons: <MdOutlineHomeWork />,
    path: "/sidebar/room",
  },
  {
    id: 4,
    title: "Food Menu",
    icons: <ImSpoonKnife />,
    path: "/sidebar/food-menu",
  },
  {
    id: 5,
    title: "Inventory",
    icons: <TbCube />,
    path: "/sidebar/inventory",
  },
  {
    id: 6,
    title: "Cutomer & Suppliers",
    icons: <FaRegUser />,
    path: "/sidebar/customer",
  },
  {
    id: 7,
    title: "Finance",
    icons: <RiMoneyDollarCircleLine />,
    path: "/sidebar/finance",
  },
  {
    id: 8,
    title: "Website",
    icons: <FiGlobe />,
    path: "/sidebar/website",
  },
  {
    id: 9,
    title: "Setting",
    icons: <IoSettingsOutline />,
    path: "/sidebar/setting",
  },
  {
    id: 10,
    title: "Logout",
    icons: <IoMdLogOut />,
    showRed: "true",
    path: "/dashboard",
  },
];
