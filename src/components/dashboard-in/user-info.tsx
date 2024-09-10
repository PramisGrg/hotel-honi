import { useGetUser } from "@/queries/user/get-user-query";
import { useGetUserStore } from "@/store/user-store";
import { useEffect } from "react";

const UserInfo = () => {
  const { name, setName, setPhone, setUsername } = useGetUserStore((state) => ({
    name: state.name,
    setName: state.setName,
    setPhone: state.setPhone,
    setUsername: state.setUsername,
  }));

  const { data } = useGetUser();

  useEffect(() => {
    if (data) {
      setName(data?.data?.name);
      setPhone(data?.data?.phoneNumber);
      setUsername(data?.data?.username);
    }
  }, [setName, data, setPhone, setUsername]);

  return (
    <div>
      <p className="text-xl">Welcome Back,</p>
      <h1 className="font-semibold">{name}</h1>
    </div>
  );
};

export default UserInfo;
