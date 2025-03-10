import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { Circle } from "lucide-react";
import logo from "@/assets/restroflow.png";

export default function SidebarOnbaording() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { getOpenState, setIsHover, settings } = sidebar;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md bg-red-50 border-r border-red-100"
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
            <img
              className="md:w-44 md:h-44 h-4 w-4 object-cover mt-10"
              src={logo}
              alt="logo of Restro flow"
            />
          </Link>
        </Button>
        <div className="py-8 space-y-8">
          <h1 className="text-neutral-600 text-lg">Onboarding Steps :</h1>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <CircleCheck className="text-green-500 h-10 w-10" />
            <div className="">
              <h1 className="text-sm font-semibold">Sign Up</h1>
              <p className="text-neutral-500 text-xs">
                Sign Up to RestroFlow using email or phonenumber
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <CircleCheck className="text-green-500 h-10 w-10" />
            <div>
              <h1 className="text-sm font-semibold">Profile Setup</h1>
              <p className="text-neutral-500 text-xs">
                Provide your basic info such as name, address to us
              </p>
            </div>
          </div>
          <div className="flex gap-4 border-2 p-3 rounded-md">
            <Circle className="text-green-500 h-14 w-14" />
            <div>
              <h1 className="text-sm font-semibold">Create or join hotel</h1>
              <p className="text-neutral-500 text-xs">
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
