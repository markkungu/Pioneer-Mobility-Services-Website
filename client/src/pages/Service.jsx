import React from "react";
import { useNavigate } from "react-router-dom"; 
import wheelchair from "../assets/services/wheelchair.png"; 
import ambulance from "../assets/services/ambulance.png";
import school from "../assets/services/school-transport.png";
import cab from "../assets/services/cab.png";
import book from "../assets/services/book-ride.png";


const services = [
  {
    id: 1,
    title: "Wheelchair & Stretcher Transport",
    description:
      "Safe and reliable transportation for individuals requiring wheelchair or stretcher assistance.",
    image: wheelchair, 
    base_price: 50
  },
  {
    id: 2,
    title: "Ambulatory Transportation",
    description:
      "Ideal for patients who can walk but need assistance getting to medical appointments.",
    image: ambulance, 
    base_price: 60
  },
  {
    id: 3,
    title: "Specialized School Transport",
    description:
      "Reliable transport for students with special needs, ensuring safety and punctuality.",
    image: school, 
    base_price: 40
  },
  {
    id: 4,
    title: "Cabulance Services",
    description:
      "Non-emergency medical transportation ensuring patients reach their destination safely.",
    image: cab, 
    base_price: 30
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleSelectService = (service) => {
    navigate("/scheduling", { state: { service } });
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      {/* Main Container */}
      <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16">
        
        {/* Hero Section */}
        <div className="w-full flex flex-col md:flex-row items-center">
  {/* Left Section (Text) */}
  <div className="w-full lg:w-1/2 h-[400px] bg-[#188754] rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center p-6">
    <div className="text-center text-white">
      <h1 className="text-3xl md:text-4xl font-bold">Book a Ride</h1>
      <img
        className="w-[180px] h-4 mt-2 mx-auto"
        alt="Vector"
        src="https://c.animaapp.com/m8mo09emU1GpO2/img/vector-1.svg"
      />
      <p className="text-md md:text-lg p-3">
        Just a few steps to get you our fast service. Fill in the information below.
      </p>
    </div>
  </div>

  {/* Right Section (Image) */}
  <div className="w-full lg:w-1/2">
    <img 
      className="w-full h-[400px] object-cover rounded-b-lg md:rounded-r-lg md:rounded-bl-none" 
      alt="Booking process" 
      src={book} 
    />
  </div>
</div>


        {/* Subtitle Section */}
        <div className="text-center mt-4">
          <h2 className="text-[#188754] text-2xl font-bold">Choose an option below</h2>
          <img className="w-[150px] h-[14px] mx-auto mt-2" alt="Group" src="https://c.animaapp.com/m8mo09emU1GpO2/img/group-12.png" />
        </div>                                        

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mt-6 pt-4 pb-8 w-full max-w-[1000px]">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg border border-gray-300 shadow-md p-4 text-center">
              <img className="w-full h-[180px] object-cover rounded-lg mb-3" alt={service.title} src={service.image} />
              <h3 className="text-[#188754] text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{service.description}</p>
              <p className="text-gray-800 text-lg font-bold mt-1">${service.base_price}</p>
              <button 
                className="mt-3 w-full bg-[#188754] text-white text-md font-semibold py-2 rounded-lg shadow-md hover:bg-[#166b4f] transition"
                onClick={() => handleSelectService(service)}
              >
                Book a Ride
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
