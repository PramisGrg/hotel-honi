import { IoMdLock } from "react-icons/io";

const LockScreen = () => {
  const handleClick = () => {
    console.log("Pramis");
  };

  return (
    <div className="md:block hidden absolute top-4 right-4">
      <button onClick={handleClick}>
        <div className="flex text-white hover:text-gray-300 duration-500 bg-blue-800 gap-2 p-2 rounded-md">
          <IoMdLock className="text-xl" />
          <p className="text-sm">Lock Screen</p>
        </div>
      </button>
    </div>
  );
};

export default LockScreen;
