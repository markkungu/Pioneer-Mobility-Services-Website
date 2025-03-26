import { useState } from "react";
import { LOCAL_HOST } from "../host.js";
import { Phone, Mail, MapPin } from "lucide-react"; // Import Lucide icons
import location from "../assets/location.png";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        toast.success("✅ Email successfully sent!", { position: "top-center", style: { backgroundColor: "#fff", color: "#188754" } });
      } else {
       toast.success("❌ Failed to send email, please try again later!", { position: "top-center", style: { backgroundColor: "#fff", color: "#188754" } });
      }
    } catch (err) {
      console.error("❌ Error sending email:", err);
    }

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="container px-6 mx-auto mb-8 flex flex-col gap-12">
        <ToastContainer />
      <div className="w-full flex flex-col md:flex-row items-stretch">
        {/* Left Section (Text) */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center bg-[#188754] p-6 
            rounded-t-4xl md:rounded-l-4xl md:rounded-tr-none md:rounded-br-none"
        >
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-7xl font-extrabold text-center">
              Get in Touch
            </h1>
            <img
              className="w-[80%] max-w-[500px] h-auto mt-2 mx-auto"
              alt="Vector"
              src="https://c.animaapp.com/m8mo09emU1GpO2/img/vector-1.svg"
            />

            <p className="text-md md:text-xl p-3">
              Have questions? <br />
              Need to schedule a ride? <br />
              Contact us today!
            </p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div
            className="w-full bg-white p-6 shadow-lg  border-b-slate-200 border-r-slate-300
            rounded-b-lg md:rounded-r-lg md:rounded-bl-none md:rounded-tl-none"
          >
            <h3 className="text-3xl font-bold text-[#188754] mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-2xl text-black  mb-1"
                >
                  Name
                </label>
                <input
  type="text"
  id="name"
  name="name"
  placeholder="Enter your name"
  value={formData.name}
  onChange={handleChange}
  className="w-full p-3 font-normal bg-slate-100 rounded-lg focus:outline-none text-lg placeholder:text-lg placeholder:font-normal"
  required
/>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-2xl text-black mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email here"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 font-normal bg-slate-100 rounded-lg focus:outline-none text-lg placeholder:text-lg placeholder:font-normal"
                  
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-black text-2xl mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="What message/question do you have for us?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 font-normal bg-slate-100 rounded-lg focus:outline-none text-lg placeholder:text-lg placeholder:font-normal"
  
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#188754] w-2/5 text-white px-4 py-2 font-bold text-2xl text-center  rounded-lg hover:bg-[#128178] transition md:p-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col">
        <h2 className="text-[#188754] text-2xl text-center font-bold capitalize">
          You Can Also Give Us A Visit{" "}
        </h2>
        <img
          className="w-[200px] h-[14px] mx-auto mt-2"
          alt="Group"
          src="https://c.animaapp.com/m8mo09emU1GpO2/img/group-12.png"
        />
      </div>
      <div
        className="mx-auto w-9/10  shadow-lg border-b-slate-200 border-r-slate-300 p-6 rounded-lg bg-white
      flex flex-col lg:flex-row gap-8"
      >
        <div className="w-full lg:w-1/2 ">
          <img
            className="w-full h-[300px] rounded-lg mt-2 mx-auto"
            alt="Vector"
            src={location}
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-xl font-semibold text-[#188754]  w-full lg:w-1/2 mb-4">
            Contact Information
          </h3>
          <p className="text-gray-700 flex items-center gap-3 mb-2">
            <Phone size={20} className="text-[#188754]" /> 206-307-7496 /
            206-307-5575
          </p>
          <p className="text-gray-700 flex items-center gap-3 mb-2">
            <Mail size={20} className="text-[#188754]" />{" "}
            info@pioneermobilityservices.com
          </p>
          <p className="text-gray-700 flex items-center gap-3 mb-4">
            <MapPin size={20} className="text-[#188754]" /> 123 Pioneer Mobility
            Road, Washington, USA
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
