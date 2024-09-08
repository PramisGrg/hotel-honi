import { Link, useNavigate } from "react-router-dom";
import leftImage from "../assets/leftImage.png";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EFECFF] p-6">
      <div className="grid md:grid-cols-2 max-w-[1120px] w-full">
        <div className="md:order-1 order-2 bg-white h-[600px] ">
          <div className="flex flex-col items-center justify-center gap-6 h-full">
            <h1 className="text-4xl">Welcome to Hotel Honi</h1>
            <h3 className="text-sm">
              The best cloud based hotel management system
            </h3>
            <Button
              onClick={handleClick}
              className="bg-[#2722C0] w-2/3 duration-300 hover:text-gray-400"
            >
              Start Managing My Hotel{" "}
            </Button>
            <div className="flex gap-2">
              <p>Already have an account ?</p>
              <Link
                className="text-[#2722C0] duration-300 hover:text-gray-400"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="md:order-2 md:block hidden order-1 h-[600px]">
          <img
            className="h-full w-full object-cover"
            src={leftImage}
            alt="Left side image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
