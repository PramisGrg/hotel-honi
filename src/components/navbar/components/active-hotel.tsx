import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ImageWrapper } from "@/lib/image.wrapper";
import { useGetActiveHotel } from "@/queries/hotel/get.active.hotel.query";
import { useGetAllHotels } from "@/queries/hotel/get.all.hotels.query";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import SpinnerSwitch from "@/components/common/spinner-switch";
import { useSwitchHotelQuery } from "@/queries/hotel/switch.hotel.query";

interface ActiveHotelProps {
  image?: string | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export function ActiveHotel({ image, isOpen, setIsOpen }: ActiveHotelProps) {
  const { user } = useUserStore();

  const allHotels = useGetAllHotels();
  const activeHotel = useGetActiveHotel();
  const switchHotel = useSwitchHotelQuery();

  const activeHotelData = activeHotel.data?.data;

  const [loading, setLoading] = useState(false);

  const handleSwitchHotel = (hotelId: string) => {
    setLoading(true);
    switchHotel.mutate(hotelId, {
      onSuccess: () => {
        setLoading(false);
        setIsOpen(false);
      },
    });
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <SpinnerSwitch loaderStyle="w-60 h-60" />
      </div>
    );

  const CheckedSwitch = () => <Switch checked />;
  const UnCheckedSwitch = (hotelId: string) => {
    return <Switch onCheckedChange={() => handleSwitchHotel(hotelId)} />;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <ImageWrapper src={image ?? undefined} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 mr-8 p-4 space-y-4">
        <div className="flex flex-col items-center gap-4 justify-center">
          <ImageWrapper src={image ?? undefined} />
          <div className="text-neutral-500">{user?.name}</div>
          <button className="text-sm text-primary underline underline-offset-2">
            Edit Profile
          </button>
        </div>
        <div className="text-neutral-500">
          <h1>Switch Resturant ({allHotels.data?.data.length})</h1>
        </div>
        {allHotels.data?.data.map((item) => (
          <div className="flex justify-between" key={item.hotel.id}>
            <div className="text-neutral-600">
              <h1>{item.hotel.name}</h1>
              <p className="text-sm text-neutral-400">{item.hotel.address}</p>
            </div>
            {activeHotelData?.id === item.hotel.id
              ? CheckedSwitch()
              : UnCheckedSwitch(item.hotel.id)}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
