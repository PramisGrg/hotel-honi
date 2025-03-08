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
        "flex min-h-screen w-full items-center justify-center",
        loaderWrapperStyle
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "h-24 w-24 animate-spin rounded-full border-4 border-gray-300 border-t-primary",
            loaderStyle
          )}
        />
        <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          HH.
        </p>
      </div>
    </div>
  );
}
