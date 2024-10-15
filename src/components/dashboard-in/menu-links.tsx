import { AiFillDollarCircle } from "react-icons/ai";
import { FaQuestionCircle, FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { IoFastFood, IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MenuLinks = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Manage your Hotel</h1>
        <p className="text-gray-600 text-sm">
          Get overview and make changes quickly
        </p>
      </div>
      <div className="">
        <div className="grid md:grid-cols-4 gap-10 sm:grid-cols-3 grid-cols-2">
          <Link to="bookings">
            <div className="flex flex-col items-center rounded-lg justify-center bg-[#ececfc] p-4 ">
              <FaRegCalendarAlt className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Bookings</h1>
            </div>
          </Link>
          <Link to="orders">
            <div className="bg-[#ececfc] flex flex-col rounded-lg items-center justify-center p-4 ">
              <IoFastFood className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Orders</h1>
            </div>
          </Link>
          <Link to="customer">
            <div className="bg-[#ececfc] flex flex-col rounded-lg items-center justify-center p-4 ">
              <FaUserAlt className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Customers</h1>
            </div>
          </Link>
          <Link to="finance">
            <div className="bg-[#ececfc] flex flex-col rounded-lg items-center justify-center p-4 ">
              <AiFillDollarCircle className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Finance</h1>
            </div>
          </Link>
          <Link to="checkout">
            <div className="flex flex-col items-center rounded-lg justify-center bg-[#ececfc] p-4 ">
              <GrLogout className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Checkout</h1>
            </div>
          </Link>
          <Link to="settings">
            <div className="flex flex-col items-center rounded-lg justify-center bg-[#ececfc] p-4 ">
              <IoSettingsSharp className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Settings</h1>
            </div>
          </Link>
          <Link to="supplier">
            <div className="flex flex-col items-center rounded-lg justify-center bg-[#ececfc] p-4 ">
              <FaPersonCircleCheck className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Suppliers</h1>
            </div>
          </Link>
          <Link to="helpcenter">
            <div className="flex flex-col items-center rounded-lg justify-center bg-[#ececfc] p-4">
              <FaQuestionCircle className="text-[#3636BC] duration-300 hover:text-[#8282ff] h-12 w-12" />
              <h1>Help</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuLinks;
