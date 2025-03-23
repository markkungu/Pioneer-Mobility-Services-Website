import { MapPin } from "lucide-react";
import ctaImage from "../../assets/cta.png"; // Importing the image

const CTASection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      {/* Header Section */}
      <h1 className="text-[#188754] text-3xl lg:text-4xl font-bold mb-6">
        Need a Ride?
      </h1>

      {/* Main CTA Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 px-6">
        {/* Left Side: Map with LocationsInformation Box */}
        <div
          className="relative w-[600px] h-[431px] mt-[30px] lg:mt-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ctaImage})` }}
        >
          {/* Locations */}
          {[
            { name: "Olympia", top: 132, left: 92 },
            { name: "Seattle", top: 0, left: 107 },
            { name: "Spokane", top: 7, left: 459 },
            { name: "Portland", top: 332, left: 135 },
            { name: "Yakima", top: 224, left: 282 },
            { name: "Ephrata", top: 82, left: 320 },
            { name: "Pullman", top: 192, left: 460 },
          ].map((city, index) => (
            <div
              key={index}
              className="absolute w-[140px] h-[107px] flex flex-col items-center"
              style={{ top: `${city.top}px`, left: `${city.left}px` }}
            >
              <MapPin size={40} className="text-[#188754]" />
              <div className="w-[140px] h-11 bg-white rounded-[30px] shadow-md flex items-center justify-center">
                <p className="font-semibold text-[#188754] text-2xl">
                  {city.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Information Box */}
        <div className="relative w-[661px] h-auto">
          <div className="relative w-full h-auto bg-white p-6 rounded-2xl border border-gray-300 shadow-lg">
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
            <button className="w-full bg-[#188754] text-white py-3 mt-6 text-lg rounded-lg hover:bg-[#146c43] transition">
              Click Here to Book a Ride
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
