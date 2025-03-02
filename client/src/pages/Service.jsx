import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import wheelchair from "../assets/services/wheelchair.png"; 
import ambulance from "../assets/services/ambulance.png";
import school from "../assets/services/school-transport.png";
import cab from "../assets/services/cab.png";

const services = [
  {
    id: 1,
    title: "Wheelchair & Stretcher Transport",
    description:
      "Safe and reliable transportation for individuals requiring wheelchair or stretcher assistance. Our trained staff ensures a comfortable ride.",
    image: wheelchair, 
    base_price: 50
  },
  {
    id: 2,
    title: "Ambulatory Transportation",
    description:
      "Ideal for patients who can walk but need assistance getting to medical appointments. Safe and comfortable rides provided.",
    image: ambulance, 
    base_price: 40
  },
  {
    id: 3,
    title: "Specialized School Transport",
    description:
      "Reliable transport for students with special needs, ensuring they reach school and return home safely and on time.",
    image: school, 
    base_price: 30
  },
  {
    id: 4,
    title: "Cabulance Services",
    description:
      "Non-emergency medical transportation with extra care, ensuring patients get to their destination safely and comfortably.",
    image: cab, 
    base_price: 60
  },
];

const Services = () => {
  const navigate = useNavigate();

  // Function to handle service selection
  const handleSelectService = (service) => {
    navigate("/scheduling", { state: { service } }); // Pass service data
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#0B3D5A] mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#0B3D5A]">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <button
                  onClick={() => handleSelectService(service)} // Pass selected service
                  className="mt-4 bg-[#0B3D5A] text-white px-4 py-2 rounded-lg hover:bg-[#128178] transition"
                >
                  Schedule a Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
