// import { cn } from "@/lib/utils";

// interface Props {
//   loaderWrapperStyle?: string;
//   loaderStyle?: string;
// }

// export default function Spinner({ loaderWrapperStyle, loaderStyle }: Props) {
//   return (
//     <div
//       className={cn(
//         "flex min-h-screen w-full items-center justify-center",
//         loaderWrapperStyle
//       )}
//     >
//       <div className="relative">
//         <div
//           className={cn(
//             "h-24 w-24 animate-spin rounded-full border-4 border-gray-300 border-t-primary",
//             loaderStyle
//           )}
//         />
//         <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
//           HH.
//         </p>
//       </div>
//     </div>
//   );
// }

const spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif" />
      <h1 className="text-2xl">Switching Hotel </h1>
      <p className="text-sm text-gray-500">
        Please wait while you are switcihng hotel
      </p>
    </div>
  );
};

export default spinner;
