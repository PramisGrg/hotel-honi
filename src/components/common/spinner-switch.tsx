import { cn } from "@/lib/utils";

interface Props {
  loaderWrapperStyle?: string;
  loaderStyle?: string;
}

export default function SpinnerSwitch({
  loaderWrapperStyle,
  loaderStyle,
}: Props) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center",
        loaderWrapperStyle
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "h-12 w-12 animate-spin rounded-full border-8 border-gray-300 border-t-primary",
            loaderStyle
          )}
        />
        <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold text-neutral-600">
          Switching Hotel
        </p>
      </div>
    </div>
  );
}
