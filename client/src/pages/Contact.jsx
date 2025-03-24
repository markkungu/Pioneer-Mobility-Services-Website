import { useState } from "react";
import { LOCAL_HOST } from "../host.js";
import { Phone, Mail, MapPin } from "lucide-react"; // Import Lucide icons

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Submitted:", formData);

      const response = await fetch(`${LOCAL_HOST}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: formData.email,
          subject: `Contact Form Submission from ${formData.name}`,
          message: formData.message,
        }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("📩 Server Response:", data);

      if (data.success) {
        alert("✅ Email successfully sent!");
      } else {
        alert("❌ Failed to send email, please try again later!");
      }
    } catch (err) {
      console.error("❌ Error sending email:", err);
    }

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="container py-12 px-6 mx-auto">
      <div className="w-full flex flex-col md:flex-row items-stretch">
        {/* Left Section (Text) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#188754] p-6 
            rounded-t-lg md:rounded-l-lg md:rounded-tr-none md:rounded-br-none">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold">Get in Touch</h1>
            <img
              className="w-[180px] h-4 mt-2 mx-auto"
              alt="Vector"
              src="https://c.animaapp.com/m8mo09emU1GpO2/img/vector-1.svg"
            />
            <p className="text-md md:text-lg p-3">
              Have questions? <br />
              Need to schedule a ride? <br />
              Contact us today!
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="w-full bg-white p-6 shadow-lg  border-b-slate-200 border-r-slate-300
            rounded-b-lg md:rounded-r-lg md:rounded-bl-none md:rounded-tl-none">
            <h3 className="text-xl font-semibold text-[#188754] mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg focus:outline-none"
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg focus:outline-none"
                required
              />
              <button type="submit" className="bg-[#188754] text-white px-4 py-2 rounded-lg hover:bg-[#128178] transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mx-auto max-w-5xl mt-12 shadow-lg border-b-slate-200 border-r-slate-300 p-6 rounded-lg bg-white">
        <h3 className="text-xl font-semibold text-[#188754] mb-4">Contact Information</h3>
        <p className="text-gray-700 flex items-center gap-3 mb-2">
          <Phone size={20} className="text-[#188754]" /> 206-307-7496 / 206-307-5575
        </p>
        <p className="text-gray-700 flex items-center gap-3 mb-2">
          <Mail size={20} className="text-[#188754]" /> info@pioneermobilityservices.com
        </p>
        <p className="text-gray-700 flex items-center gap-3 mb-4">
          <MapPin size={20} className="text-[#188754]" /> 123 Pioneer Mobility Road, Washington, USA
        </p>
      </div>
    </section>
  );
};

export default Contact;
