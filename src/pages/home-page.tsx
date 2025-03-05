import { Link, useNavigate } from "react-router-dom";
import { Spotlight } from "@/components/ui/spotlight";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center text-neutral-700 bg-clip-text text bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          RestroFlow <br />
          <span className="font-bold text-3xl text-neutral-400">
            a place where efficency meets exceptional dinning 🍽️✨
          </span>
        </h1>
        <p className="mt-4 font-normal text-normal text-neutral-400 max-w-lg text-center mx-auto">
          Manage all your resturant from one place
        </p>
        <div className="max-w-lg mx-auto flex gap-4 mt-4 justify-center">
          <InteractiveHoverButton onClick={() => navigate("/register")}>
            Get Started
          </InteractiveHoverButton>
        </div>
        <p className="mt-4 font-normal text-normal text-neutral-400 max-w-lg text-center mx-auto">
          Already have an account ?
          <Link
            className="ml-2 hover:text-neutral-600 font-bold text-neutral-500"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
