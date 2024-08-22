import background from "../../assets/background.png";
import womenwithtab from "../../assets/women-with-tab.png";
import thunderbolt from "../../assets/thunderbolt.png";

const Static = () => {
  return (
    <>
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
    </>
  );
};

export default Static;
