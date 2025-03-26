import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png"; 

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mx-4 bg-[#188754] text-white shadow-lg rounded-lg overflow-hidden">
  {/* Left Section - Image */}
  <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
    <img
      className="w-full h-full object-cover"
      alt="driver helping client"
      src={heroImage}
    />
  </div>

  {/* Right Section - Content */}
  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center text-center md:text-left">
    <p className="text-white text-3xl md:text-4xl font-bold leading-tight">
      Reliable & Safe Non-Emergency Medical Transportation in Washington State
    </p>
    <img
      className="w-[50%] max-w-[300px] h-auto mt-2 mx-auto md:mx-0"
      alt="Vector"
      src="https://c.animaapp.com/m8lsvibom5QJ9I/img/vector-1.svg"
    />
    <p className="mt-6 text-white text-lg md:text-xl leading-[1.4]">
      Ensuring accessible and professional transport services for all mobility needs.
    </p>
    <div className="mt-8">
      <Link to="/services">
        <button className="w-full md:w-[300px] h-[50px] bg-white text-[#188754] font-bold text-lg md:text-xl rounded-lg shadow-md hover:bg-gray-100 transition-all">
          Click Here to Book a Ride
        </button>
      </Link>
    </div>
  </div>
</div>

  );
};

export default HeroSection;
