import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ImageWrapper } from "@/lib/image.wrapper";
import { useGetAllHotels } from "@/queries/hotel/get.all.hotels.query";
import { useUserStore } from "@/store/user.store";

interface ActiveHotelProps {
  image?: string | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export function ActiveHotel({ image, isOpen, setIsOpen }: ActiveHotelProps) {
  const { user } = useUserStore();
  const allHotels = useGetAllHotels();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <ImageWrapper src={image ?? undefined} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 mr-8">
        <div>{user?.phoneNumber}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
