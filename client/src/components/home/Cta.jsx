const CTASection = () => {
    return (
      <section className="bg-[#0B3D5A] text-white py-12 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Ride? Schedule Now!</h2>
          <p className="text-lg md:text-xl mb-6">Reliable & Safe Non-Emergency Medical Transportation</p>
          <a 
            href="/services" 
            className="bg-[#128178] hover:bg-white hover:text-[#0B3D5A] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
          >
            Book Now
          </a>
        </div>
      </section>
    );
  };
  
  export default CTASection;
  