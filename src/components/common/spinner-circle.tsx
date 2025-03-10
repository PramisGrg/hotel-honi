import { cn } from "@/lib/utils";

interface Props {
  loaderWrapperStyle?: string;
  loaderStyle?: string;
}

export default function SpinnerCircle({
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
            "h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary",
            loaderStyle
          )}
        />
      </div>
    </div>
  );
}
