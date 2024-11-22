import notFoundImage from "@/assets/404-Error.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          className="w-[40vw] h-[40vh]"
          src={notFoundImage}
          alt="not found Image alternative"
        />
        <Button
          onClick={() => {
            navigate("/dashboard/home");
          }}
        >
          Return to dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
