import { sidebarItems } from "@/data/SidebarItems";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import tonicbyte from "@/assets/tonicbyte.jpeg";
import Logout from "@/pages/auth/logout";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setLogoutOpen(true);
  };

  return (
    <div className="bg-[#EFECFF] sticky top-0 left-0 h-screen">
      {/* Desktop Sidebar */}
      <ul className="md:block hidden px-4 py-4 space-y-4">
        {/*Logo and Title*/}

        {/* <div className="flex p-3 gap-2">
          <img
            className="rounded-full w-1- h-10"
            src={tonicbyte}
            alt="tonic byte Logo"
          />
          <h1 className="text-black text-xl font-semibold pt-3">Hotel Honi</h1>
        </div> */}
        {sidebarItems.map((item) => (
          <li
            id={`item-${item.id}`}
            className={`flex gap-4 w-[250px] p-3 rounded-lg duration-500 hover:bg-[#9f96d4] ${
              item.showRed ? "text-red-500" : "text-black"
            }`}
            key={item.id}
          >
            {item.title === "Logout" ? (
              <button onClick={handleLogout} className="flex gap-4 text-sm">
                <div className="text-xl">{item.icons}</div>
                <div>{item.title}</div>
              </button>
            ) : (
              <Link className="flex gap-4 text-sm" to={item.path}>
                <div className="text-xl">{item.icons}</div>
                <div>{item.title}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {/* Hamburger Menu */}
      <div className="md:hidden fixed right-0 top-0 text-2xl p-3">
        <button onClick={handleToggle}>
          {open ? <RxCross1 className="font-bold" /> : <GiHamburgerMenu />}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={
          open
            ? `md:hidden fixed top-0 left-0 h-full ease-in-out duration-500 flex-col bg-[#EFECFF] text-white w-56 space-y-4 pl-2`
            : `ease-in-out duration-500 fixed h-full top-0 left-[-100%]`
        }
      >
        <div className="flex py-3 gap-3">
          <img
            className="rounded-full w-12 h-12"
            src={tonicbyte}
            alt="tonic byte Logo"
          />
          <h1 className="text-black text-xl font-semibold pt-3">Hotel Honi</h1>
        </div>

        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li
              className={`flex gap-4 w-[200px] p-3 rounded-lg duration-500 hover:bg-[#9f96d4] ${
                item.showRed ? "text-red-500" : "text-black"
              }`}
              key={item.id}
            >
              <Link className="flex gap-4 text-sm" to={item.title}>
                <div className="text-xl">{item.icons}</div>
                <div>{item.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Logout isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />;
    </div>
  );
};

export default Sidebar;
