import { FaWheelchair, FaUserTie, FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";

const features = [
  { icon: <FaWheelchair size={40} className="text-[#128178]" />, title: "ADA-Compliant Vehicles", desc: "Ensuring accessibility for all passengers." },
  { icon: <FaUserTie size={40} className="text-[#128178]" />, title: "Professional, Trained Drivers", desc: "Experienced drivers committed to your safety." },
  { icon: <FaMapMarkerAlt size={40} className="text-[#128178]" />, title: "Real-Time GPS Tracking", desc: "Track your ride for peace of mind." },
  { icon: <FaDollarSign size={40} className="text-[#128178]" />, title: "Medicaid & Private Pay Accepted", desc: "Flexible payment options for convenience." },
  { icon: <FaClock size={40} className="text-[#128178]" />, title: "24/7 Scheduling Support", desc: "Book a ride anytime, anywhere." },
];

const KeyFeatures = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D5A] mb-6">Our Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold text-[#0B3D5A] mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
