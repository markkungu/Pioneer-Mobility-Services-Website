export default function AboutUs() {
  return (
    <div className="bg-white flex flex-col justify-center w-full min-h-screen">
      {/* Main About Us Section */}
      <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16">
  <div className="w-full flex flex-col md:flex-row items-center">
    
    {/* Left Side - Green Section */}
    <div className="w-full md:w-1/2 min-h-[400px] bg-[#188754] rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-4xl md:text-7xl font-extrabold text-white">ABOUT US</h2>
      <img
        className="w-[50%] max-w-[300px] h-auto mt-2"
        alt="Vector"
        src="https://c.animaapp.com/m8lsvibom5QJ9I/img/vector-1.svg"
      />
      <p className="text-white text-lg md:text-xl leading-relaxed mt-4 max-w-[90%]">
        Providing safe, professional, and reliable non-emergency medical
        transportation (NEMT) for individuals who need mobility support.
      </p>
    </div>

    {/* Right Side - Image */}
    <div className="w-full md:w-1/2">
      <img 
        className="w-full h-[400px] object-cover rounded-b-lg md:rounded-r-lg md:rounded-bl-none" 
        alt="Rectangle" 
        src="https://c.animaapp.com/m8lsvibom5QJ9I/img/rectangle-24.png" 
      />
    </div>
  </div>
</div>


      {/* Who We Are Section */}
      <div className="flex flex-col items-center w-full p-10 bg-[#e9fff5] mx-auto">
  <div className="py-2 flex flex-col items-center text-center">
    <h2 className="text-[#188754] text-3xl font-normal">WHO WE ARE</h2>
    <img
      className="w-[186px] h-[18px] mt-2"
      alt="Group"
      src="https://c.animaapp.com/m8lsvibom5QJ9I/img/group-12.png"
    />
  </div>

  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-[1260px]">
    {/* About Content */}
    <div className="flex flex-col w-full text-center lg:text-left">
      <h3 className="text-[#3e3e3e] text-3xl md:text-[40px] font-normal">
        Pioneer Mobility Services
      </h3>
      <p className="text-[#3e3e3e] text-lg md:text-xl leading-8 md:leading-10 mt-4 max-w-[729px] text-justify mx-auto lg:mx-0">
        We are a Washington State-based and family-owned leading provider
        of non-emergency medical transportation (NEMT) services. <br />
        We are committed to ensuring safe, timely, and comfortable rides for
        individuals with medical and mobility needs. <br />
        Our team consists of highly trained professionals, compassionate
        drivers, and experienced coordinators who work together to remove
        transportation barriers for seniors, patients, and individuals with
        mobility challenges. <br />
        Whether it’s a doctor’s appointment, dialysis treatment, hospital
        discharge, or rehabilitation visit, we ensure that every passenger
        receives the highest level of care and assistance.
      </p>
    </div>

    {/* Services List */}
    <div className="flex flex-col gap-4 w-full max-w-[960px]">
      {[
        "Medical Appointment Transport",
        "Trained, Compassionate Drivers",
        "Dialysis and Rehabilitation Rides",
        "Hospital Discharge Assistance",
        "Senior and Mobility Support",
        "Safe, Timely Transportation",
        "Patient-Centered Care",
      ].map((service, index) => (
        <div
          key={index}
          className="flex items-center bg-[#188754] text-white text-lg md:text-2xl font-semibold py-3 px-4 rounded-lg"
        >
          <img
            className="w-[25px] md:w-[30px] h-[25px] md:h-[30px] mr-3"
            alt="Check"
            src="https://c.animaapp.com/m8lsvibom5QJ9I/img/check--4--1-6.png"
          />
          {service}
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Mission & Vision Section - Centered */}
      <div className="flex flex-col items-center justify-center w-full bg-white py-20">
        <div className="flex flex-col items-center">
          <h2 className="text-[#188754] text-3xl font-semibold text-center">
            MISSION AND VISION
          </h2>
          <img
            className="w-[186px] mt-2"
            alt="Underline"
            src="https://c.animaapp.com/m8lsvibom5QJ9I/img/group-12-1.png"
          />
        </div>

        {/* Centered Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-10 mt-10 max-w-[1260px] w-full">
          {/* Mission Card */}
          <div className="bg-white rounded-[20px] border border-[#d7d7d7] p-8 text-center">
            <h3 className="text-[#188754] text-[32px] font-semibold">
              Our Mission
            </h3>
            <p className="text-[#636363] text-2xl text-justify leading-10 mt-4">
              Our mission is to provide unparalleled non-emergency medical
              transportation (NEMT) services tailored to meet the diverse
              transportation needs of our clients. Whether it is for medical
              appointments, rehabilitation sessions, routine health visits, or
              specialized school transportation, we ensure our passengers feel
              safe, valued, respected, and comfortable.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#188754] rounded-[20px] p-8 text-center">
            <h3 className="text-white text-[32px] font-semibold">
              Our Vision
            </h3>
            <p className="text-white text-2xl text-justify leading-10 mt-4">
              Our vision is to be the most trusted and accessible non-medical
              emergency transportation provider, ensuring mobility is never a
              barrier to healthcare through innovation, excellence, and
              patient-first care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 