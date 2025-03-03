const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Who We Are */}
        <h2 className="text-3xl font-bold text-[#0B3D5A] mb-6">Who We Are</h2>
        <p className="text-lg text-gray-700 mb-8">
          We are committed to providing safe, reliable, and compassionate
          non-emergency medical transportation in Washington State. Our mission
          is to ensure every patient gets to their destination comfortably and on time.
        </p>

        {/* What Sets Us Apart */}
        <h2 className="text-3xl font-bold text-[#0B3D5A] mb-6">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {/* Technology */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#0B3D5A] mb-3">🚀 Advanced Technology</h3>
            <p className="text-gray-600">
              Our fleet is equipped with real-time GPS tracking to ensure
              efficient and transparent rides.
            </p>
          </div>

          {/* Trained Staff */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#0B3D5A] mb-3">👨‍⚕️ Trained & Certified Staff</h3>
            <p className="text-gray-600">
              Our drivers and medical escorts undergo rigorous ADA-compliant training to assist patients safely.
            </p>
          </div>

          {/* Partnerships */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#0B3D5A] mb-3">🤝 Trusted Partnerships</h3>
            <p className="text-gray-600">
              We work with hospitals, nursing homes, and Medicaid providers to serve our communities better.
            </p>
          </div>
        </div>

        {/* Our Vision for the Future */}
        <h2 className="text-3xl font-bold text-[#0B3D5A] mt-12 mb-6">Our Vision for the Future</h2>
        <p className="text-lg text-gray-700">
          We envision a future where accessible transportation is available to all,
          ensuring every patient, regardless of mobility challenges, has a seamless and dignified journey.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

