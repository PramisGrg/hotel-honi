import { useGetUserQuery } from "@/queries/user/get.user.query";
import { ActiveHotel } from "./active-hotel";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setUser } = useUserStore();
  const { data: user } = useGetUserQuery();
  const userData = user?.data;

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [setUser, userData]);

  return (
    <div className="px-8 flex gap-4 justify-end">
      <div>
        <h1 className="text-neutral-700">{userData?.name}</h1>
        <p className="text-sm text-neutral-400 text-right">Owner</p>
      </div>
      <div onClick={() => setIsOpen(true)}>
        <ActiveHotel
          image={userData?.avatar}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default UserInfo;
