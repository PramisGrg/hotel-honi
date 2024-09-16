import { sidebarItems } from "@/data/sidebar-items";
import { Link } from "react-router-dom";
import { useState } from "react";
import tonicbyte from "@/assets/tonicbyte.jpeg";
import Logout from "@/pages/auth/logout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    setLogoutOpen(true);
  };

  return (
    <div className="bg-[#EFECFF] sticky top-0 left-0 h-screen">
      <ul className="block px-4 py-4 space-y-2">
        {/*Logo and Title*/}
        <div className="flex gap-6">
          <img
            className="rounded-full w-10 h-10"
            src={tonicbyte}
            alt="tonic byte Logo"
          />
          <h1 className="text-black font-semibold pt-2">Hotel Honi</h1>
        </div>
        {sidebarItems.map((item) => (
          <li
            className={`flex gap-3 w-[220px] p-2 rounded-lg duration-500 hover:translate-x-2 ${
              item.showRed ? "text-red-500" : "text-black"
            }`}
            key={item.id}
          >
            {item.sub ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex gap-4">
                      <div className="text-xl">{item.icons}</div>
                      <div className="text-sm">{item.title}</div>
                    </div>
                  </AccordionTrigger>
                  {item.subItems.map((subItems) => (
                    <AccordionContent>
                      <Link
                        to={subItems.path}
                        className="flex gap-2 hover:translate-x-2 duration-300"
                      >
                        <div>{subItems.icons}</div>
                        <div>{subItems.title}</div>
                      </Link>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            ) : item.title === "Logout" ? (
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
      <Logout isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />;
    </div>
  );
};

export default Sidebar;
