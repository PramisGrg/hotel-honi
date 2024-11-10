import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { PanelsTopLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";

export default function SidebarOnbaording() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] bg-[#EFECFF] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      {/* <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} /> */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !getOpenState()
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Hotel Honi
            </h1>
          </Link>
        </Button>
        <div className="py-8 space-y-8">
          <h1 className="text-center text-gray-600 text-sm">
            Onboarding Steps :
          </h1>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <CircleCheck className="text-green-700 h-10 w-10" />
            <div className="space-y-1">
              <h1 className="text-sm font-semibold">Sign Up</h1>
              <p className="text-gray-500 text-xs">
                Sign Up to HotelHoni using email or phonenumber
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <CircleCheck className="text-green-700 h-10 w-10" />
            <div className="space-y-1">
              <h1 className="text-sm font-semibold">Profile Setup</h1>
              <p className="text-gray-500 text-xs">
                Provide your basic info such as name, address to us
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <Circle className="text-green-700 h-14 w-14" />
            <div className="space-y-1">
              <h1 className="text-sm font-semibold">Create or join hotel</h1>
              <p className="text-gray-500 text-xs">
                create hotel if you are owner and invite staff to join your
                hotel with HotelHoni
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
