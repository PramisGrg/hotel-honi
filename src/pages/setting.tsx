import User from "@/components/setting/user";
import AppLayout from "@/layout/dashboard-layout";
import ChangeUserPassword from "./auth/change-user-password";

const Setting = () => {
  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Account Setting</h1>
      </div>
      <User />
      <ChangeUserPassword />
    </AppLayout>
  );
};

export default Setting;
