import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import womenwithtab from "../assets/women-with-tab.png";
import thunderbolt from "../assets/thunderbolt.png";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFECFF]">
      <div className="flex bg-white">
        <div className="p-24">
          <div className="text-center font-bold text-4xl leading-loose">
            <h1>Welcome to Hotel Honi</h1>
          </div>
          <div className="text-sm text-center">
            <h3>The best cloud based hotel management system</h3>
          </div>
          <div className="text-center py-8 text-white">
            <button
              className="bg-[#2722C0] hover:text-gray-600 duration-300 p-2 w-full rounded-sm"
              onClick={handleClick}
            >
              Create Account
            </button>
          </div>
          <div className="flex justify-center gap-2">
            <p>Already have an account ? </p>
            <Link
              className="text-[#2722C0] duration-300 hover:text-[#CBC4EE]"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
        <div
          className="flex justify-center items-center w-96 bg-cover"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <div className="h-60 w-60 bg-purple-300 bg-opacity-50 relative rounded-3xl">
            <div className="font-bold text-xl text-white pl-4 pt-4">
              <h1>Get Free</h1>
              <h1>Website with</h1>
              <h1> Booking</h1>
              <h1>Portal</h1>
            </div>
            <img
              className="absolute bottom-10 right-4 scale-150"
              src={womenwithtab}
            />
            <img
              className="bg-white rounded-full absolute bottom-6 -translate-x-4"
              src={thunderbolt}
              alt="thunderbolt logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
