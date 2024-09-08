import Sidebar from "@/components/common/Sidebar";
import Home from "@/components/setting/home";
import Miscellaneous from "@/components/setting/miscellaneous";
import Tax from "@/components/setting/tax";
import User from "@/components/setting/user";
import { useState } from "react";

const Setting = () => {
  const [selectLink, setSelectLink] = useState<string>("User");

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full space-y-6">
        <div>
          <h1 className="text-semibold font-xl">Settings</h1>
          <h3 className="text-gray-400">
            Manage your personal or business Settings
          </h3>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              setSelectLink("User");
            }}
            className={
              selectLink === "User"
                ? `border-b-4 w-[150px] border-blue-500`
                : `w-[150px] `
            }
          >
            User
          </button>
          <button
            onClick={() => {
              setSelectLink("Home");
            }}
            className={
              selectLink === "Home"
                ? `border-b-4 w-[150px] border-blue-500`
                : `w-[150px] `
            }
          >
            Home
          </button>
          <button
            onClick={() => {
              setSelectLink("Tax");
            }}
            className={
              selectLink === "Tax"
                ? `border-b-4 w-[150px] border-blue-500`
                : `w-[150px] `
            }
          >
            Task
          </button>
          <button
            onClick={() => {
              setSelectLink("Miscellaneous");
            }}
            className={
              selectLink === "Miscellaneous"
                ? `border-b-4 w-[150px] border-blue-500`
                : `w-[150px] `
            }
          >
            Miscellaneous
          </button>
        </div>
        <div>{selectLink === "User" && <User />}</div>
        <div>{selectLink === "Home" && <Home />}</div>
        <div>{selectLink === "Tax" && <Tax />}</div>
        <div>{selectLink === "Miscellaneous" && <Miscellaneous />}</div>
      </div>
    </div>
  );
};

export default Setting;
