import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "./utils";

interface ImageWrapperProps {
  src?: string;
  className?: string;
}
export function ImageWrapper({ src, className }: ImageWrapperProps) {
  return (
    <Avatar>
      <AvatarImage
        className={cn("w-40 h-40", className)}
        src={src ? src : "https://github.com/shadcn.png"}
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
