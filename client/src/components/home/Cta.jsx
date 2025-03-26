import { MapPin } from "lucide-react";
import ctaImage from "../../assets/cta.png"; // Importing the image
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 px-4">
    {/* Header Section */}
    <div className="flex flex-col items-center mb-6 text-center">
      <h2 className="text-[#188754] text-3xl lg:text-4xl font-bold">Need a Ride?</h2>
      <img
        className="w-[186px] mt-2"
        alt="Underline"
        src="https://c.animaapp.com/m8lsvibom5QJ9I/img/group-12-1.png"
      />
    </div>
  
    {/* Main CTA Section */}
    <section className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
      {/* Left Side: Map with Locations */}
      <div className="relative w-full max-w-[600px] h-[431px] bg-cover bg-center" style={{ backgroundImage: `url(${ctaImage})` }}>
        {/* Locations (Using percentage-based positioning) */}
        {[
          { name: "Olympia", top: "30%", left: "15%" },
          { name: "Seattle", top: "5%", left: "18%" },
          { name: "Spokane", top: "5%", left: "75%" },
          { name: "Portland", top: "80%", left: "20%" },
          { name: "Yakima", top: "55%", left: "50%" },
          { name: "Ephrata", top: "25%", left: "60%" },
          { name: "Pullman", top: "45%", left: "85%" },
        ].map((city, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{
              top: city.top,
              left: city.left,
              transform: "translate(-50%, -50%)", // Centers the pin correctly
            }}
          >
            <MapPin size={30} className="text-[#188754]" />
            <div className="bg-white rounded-[30px] shadow-md flex items-center justify-center px-3 py-1">
              <p className="font-semibold text-[#188754] text-sm sm:text-lg md:text-2xl">{city.name}</p>
            </div>
          </div>
        ))}
      </div>
  
      {/* Right Side: Information Box */}
      <div className="w-full max-w-[661px]">
        <div className="w-full h-auto bg-white p-6 rounded-2xl border border-gray-300 shadow-lg text-center lg:text-left">
          <h2 className="text-[#188754] text-2xl lg:text-3xl font-semibold">
            We have Extensive Coverage Across Washington State
          </h2>
          <p className="text-gray-700 text-lg lg:text-xl mt-4">
            Our coverage includes major cities and surrounding areas, ensuring
            that you can rely on us for your transportation needs.
          </p>
          <p className="text-gray-700 text-lg lg:text-xl mt-2">
            Contact us to confirm availability in your area.
          </p>
          <p className="text-[#188754] font-bold text-xl lg:text-2xl mt-4">
            Call: 206-307-7496 | 206-307-5575
          </p>
          <Link to="/services">
            <button className="w-full bg-[#188754] text-white py-3 mt-6 text-lg rounded-lg hover:bg-[#146c43] transition">
              Click Here to Book a Ride
            </button>
          </Link>
        </div>
      </div>
    </section>
  </div>
  

  );
};

export default CTASection;
