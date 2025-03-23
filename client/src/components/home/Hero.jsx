import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png"; 

const HeroSection = () => {
  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-center mx-4  bg-[#188754] text-white shadow-lg h-[500px]">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2 h-full">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt="driver helping client"
          src={heroImage}
        />
      </div>

      {/* Right Section - Content */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <p className="text-white text-4xl font-bold leading-tight">
          Reliable & Safe Non-Emergency Medical Transportation in Washington State
        </p>

        <p className="mt-6 text-white text-xl leading-[1.4]">
          Ensuring accessible and professional transport services for all mobility needs.
        </p>

        <div className="mt-8">
          <button className="w-[300px] h-[60px] bg-white text-[#188754] font-bold text-xl font-semibold rounded-[15px] shadow-md hover:bg-gray-100 transition-all">
            Click Here to Book a Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
