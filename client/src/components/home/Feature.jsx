import Vehicles from "../../assets/features/1.jpeg";
import Drivers from "../../assets/features/2.png";
import Support from "../../assets/features/3.jpeg";
import Pay from "../../assets/features/4.jpeg";
import Tracking from "../../assets/features/5.jpeg";

const FeaturesSection = () => {
  const features = [
    {
      title: "ADA-Compliant Vehicles",
      description:
        "Our ADA-compliant fleet ensures safe and comfortable travel with wheelchair ramps, secure seating, and spacious interiors, prioritizing accessibility and dignity.",
      image: Vehicles,
    },
    {
      title: "Professional, Trained Drivers",
      description:
        "Our drivers are expertly trained in patient care, safety, and personalized assistance, ensuring smooth and professional rides.",
      image: Drivers,
    },
    {
      title: "24/7 Scheduling Support",
      description:
        "24/7 support is available for scheduling, changes, and urgent transportation needs, ensuring rides are available whenever needed.",
      image: Support,
    },
    {
      title: "Medicaid & Private Pay Accepted",
      description:
        "We offer flexible payment options, including Medicaid and private pay, ensuring accessible transportation for all.",
      image: Pay,
    },
    {
      title: "Real-Time GPS Tracking",
      description:
        "Real-time GPS tracking provides accurate arrival times, reduces wait periods, and enhances safety with instant location updates.",
      image: Tracking,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-6 bg-[#EAFFF5]">
  {/* Section Header */}
  <div className="flex flex-col items-center mb-8">
    <h2 className="text-3xl font-normal text-[#188754]">WHY CHOOSE US?</h2>
    <img
      className="w-[186px] h-[18px] mt-2"
      alt="Underline"
      src="https://c.animaapp.com/m8lsvibom5QJ9I/img/group-12-1.png"
    />
  </div>

  {/* Features Grid with Banner */}
  <div className="w-full max-w-[1264px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    
    {/* Banner - Adjusted height for mobile */}
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-[#188754] text-white p-6 sm:p-10 flex flex-col justify-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        Travel <br /> With Confidence
      </h2>
      <p className="mt-4 sm:mt-6 text-base sm:text-lg">
        From ADA-compliant vehicles to 24/7 support, we're dedicated to making your journey stress-free.
      </p>
    </div>

    {/* Feature Cards - Adjusted image & text sizes for mobile */}
    {features.map((item, index) => (
      <div
        key={index}
        className="w-full bg-white border border-gray-200 rounded-none shadow-md overflow-hidden"
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[160px] sm:h-[200px] object-cover"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl text-[#188754] font-semibold">{item.title}</h3>
          <p className="text-gray-700 text-base sm:text-lg mt-2">{item.description}</p>
        </div>
      </div>
    ))}

  </div>
</div>


  );
};

export default FeaturesSection;
