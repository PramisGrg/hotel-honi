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
import { MdTableBar } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { MdOutlineFastfood } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FaPersonCircleCheck } from "react-icons/fa6";

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
    title: "Room & Space",
    icons: <MdOutlineHomeWork />,
    sub: true,
    subItems: [
      {
        id: 11,
        title: "Rooms",
        path: "/sidebar/room-and-space/rooms",
        icons: <MdMeetingRoom />,
      },
      {
        id: 12,
        title: "Spaces",
        path: "/sidebar/room-and-space/spaces",
        icons: <LiaHotelSolid />,
      },
      {
        id: 13,
        title: "Tables",
        path: "/sidebar/room-and-space/tables",
        icons: <MdTableBar />,
      },
    ],
  },
  {
    id: 4,
    title: "Food Menu",
    icons: <ImSpoonKnife />,
    sub: true,
    subItems: [
      {
        id: 14,
        title: "Dishes",
        path: "/sidebar/food-menu/dishes",
        icons: <MdOutlineFastfood />,
      },
      {
        id: 15,
        title: "Categories",
        path: "/sidebar/food-menu/categories",
        icons: <BiCategoryAlt />,
      },
    ],
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
    sub: true,
    subItems: [
      {
        id: 14,
        title: "Customers",
        path: "/sidebar/customer-supplier/customers",
        icons: <FaPersonCircleCheck />,
      },
      {
        id: 15,
        title: "Suppliers",
        path: "/sidebar/customer-supplier/suppliers",
        icons: <BiCategoryAlt />,
      },
    ],
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
    showRed: true,
    path: "/dashboard",
  },
];
