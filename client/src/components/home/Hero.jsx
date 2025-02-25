import heroImage from "../../assets/hero.png"; 

const HeroSection = () => {
  return (
    <section className="relative bg-[#0B3D5A] text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Reliable & Safe Non-Emergency Medical Transportation in Washington State.
          </h1>
          <p className="mt-4 text-lg">
            Comfort, care, and accessibility—because your journey matters.
          </p>
          <button className="mt-6 bg-[#128178] hover:bg-[#0B3D5A] text-white px-6 py-3 rounded-lg shadow-lg transition">
            Book a Ride Now
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src={heroImage}
            alt="Wheelchair-accessible van"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
