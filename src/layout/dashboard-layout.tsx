import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}
const AppLayout = ({ children, className }: DashboardLayoutProps) => {
  return <div className={cn("w-full px-8 py-8", className)}>{children}</div>;
};

export default AppLayout;
