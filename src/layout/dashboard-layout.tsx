import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}
const AppLayout = ({ children, className }: DashboardLayoutProps) => {
  return (
    <div className={cn("max-w-[1000px] w-full mx-auto", className)}>
      {children}
    </div>
  );
};

export default AppLayout;
