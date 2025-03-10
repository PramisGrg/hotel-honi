import { useGetUserQuery } from "@/queries/user/get.user.query";
import { ActiveHotel } from "./active-hotel";
import { useState } from "react";

const UserInfo = () => {
  // const { setName, setPhone, setUsername } = useGetUserStore((state) => ({
  //   name: state.name,
  //   setName: state.setName,
  //   setPhone: state.setPhone,
  //   setUsername: state.setUsername,
  // }));
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useGetUserQuery();

  const userData = user?.data;
  // useEffect(() => {
  //   if (data) {
  //     setName(data?.data?.name);
  //     setPhone(data?.data?.phoneNumber);
  //     setUsername(data?.data?.username);
  //   }
  // }, [setName, data, setPhone, setUsername]);

  return (
    <div className="px-8 flex gap-4 justify-end">
      <div className="">
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
